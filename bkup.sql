    CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION encrypt_password(password_text text) RETURNS text AS $$
DECLARE
  salt text;
BEGIN
  salt := gen_salt('bf'); 
  RETURN crypt(password_text, salt); 
END;
$$ LANGUAGE plpgsql;
    

CREATE OR REPLACE FUNCTION before_insert_encrypt_password()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lpassword := encrypt_password(NEW.lpassword);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER encrypt_password_trigger
BEFORE INSERT ON public."login"
FOR EACH ROW EXECUTE FUNCTION before_insert_encrypt_password();

CREATE TRIGGER encrypt_password_trigger_u
BEFORE UPDATE ON public."login"
FOR EACH ROW EXECUTE FUNCTION before_insert_encrypt_password();

CREATE OR REPLACE FUNCTION validate_password(email_text text, password_text text) RETURNS boolean AS $$
DECLARE
  stored_password text;
BEGIN
  SELECT lpassword INTO stored_password FROM public."login" WHERE lemail = email_text;
  RETURN stored_password = crypt(password_text, stored_password);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_essentials(
  IN iemail VARCHAR(255)
)
RETURNS TABLE (
  uid INT,
  name TEXT,
  permission INT,
  teamid INT,
	firsttime Boolean
)

AS $$
DECLARE
  idu INT;
BEGIN
  SELECT useruid INTO idu FROM login WHERE lemail = iemail;

  RETURN QUERY
  SELECT u.uid, u.uname, u.uadminrights , u.teamtid, u.ufirsttime
  FROM public."user" u
  JOIN login l ON u.uid = l.useruid
  WHERE u.uid = idu;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION edit_password(uid BIGINT, upassword TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE login
    SET lpassword = upassword
    WHERE useruid = uid;

    IF FOUND THEN
		update public.user u
		set u.ufirsttime = false
		where u.uid = uid;
		RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_team_info(
  IN auid INT
)
RETURNS TABLE (
	uid INT,
  dname TEXT,
  tname TEXT,
  uname TEXT,
  urole TEXT,
  lemail TEXT,
  nhoras INT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT u.uid,d.dname, t.tname, u.uname, u.urole, l.lemail, r.nhoras
  FROM team t
  JOIN public."user" u ON u.teamtid = t.tid
  JOIN department d ON t.departmentdid = d.did
  JOIN login l ON l.useruid = u.uid
  JOIN regularuser r ON u.uid = r.useruid
  WHERE u.teamtid = auid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_info(user_id INT)
RETURNS TABLE (
	email TEXT,
    name TEXT,
    city TEXT,
    country TEXT,
    role TEXT,
    type TEXT,
    number TEXT,
    photo TEXT,
    start TEXT,
    seniority TEXT,
	hours int
) AS $$
BEGIN
    RETURN QUERY
    SELECT lemail AS email, uname AS name, ucity AS city, ucountry AS country, urole AS role,
           utype AS type, uemployeenumber AS number, uphoto AS photo,
           ustartdate AS start, useniority AS seniority,  nhoras as hours
    FROM public."user" u, login l, regularuser r
--     JOIN login l ON uid = useruid
	where l.useruid = uid
	AND r.useruid = uid
    AND uid = user_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_team_department(user_id INT)
RETURNS TABLE (
    team TEXT,
    department TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT tname AS team, dname AS department
    FROM team t
    JOIN department d ON t.departmentdid = d.did
    JOIN public."user" u ON t.tid = u.teamtid
    WHERE u.uid = user_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_groups(user_id INT)
RETURNS TABLE (
    group_name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT g.gname AS group_name
    FROM public."group" g
    JOIN public."userhasgroup" ug ON g.gid = ug.groupgid
    WHERE ug.useruid = user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_ruid(auid INT)
RETURNS TABLE (
    id INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        regularuserruid AS id
    FROM
        regularuserhasinsidetrainings r
    JOIN
        public."user" ON regularuserruid = uid
		where uid = auid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_trainings_data(regular_user_id INT)
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    local TEXT,
    min TEXT,
    max TEXT,
    descricao TEXT,
    area TEXT,
    start BOOLEAN,
    pending BOOLEAN,
	hinicio TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
		itid AS id,
        itname AS treino,
        itstartdate AS inicio,
        itnumofmin AS duracao,
        iteventtype AS local,
        itminparticipants AS min,
        itmaxparticipants AS max,
        itdescription AS descricao,
        ittrainingarea AS area,
        itstarted AS start,
        uhitpending AS pending,
		itstarttime AS inicio
    FROM
        public.regularuserhasinsidetrainings r
    JOIN
        insidetrainings ON insidetrainingsitid = itid
	where regularuserruid = regular_user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_trainings_data()
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    local TEXT,
	sala TEXT,
    min INT,
    max INT,
    descricao TEXT,
    area TEXT,
    start BOOLEAN,
	hinicio TEXT
) AS $$
BEGIN
    RETURN QUERY
SELECT 
	itid AS id,
    itname AS treino,
    itstartdate AS inicio,
    itnumofmin AS duracao,
    iteventtype AS local,
	itlocation AS sala,
	CAST(itminparticipants AS INT) AS min,
	CAST(itmaxparticipants AS INT) AS max,
    itdescription AS descricao,
    ittrainingarea AS area,
	itstarted AS start,
	itstarttime AS inicio
FROM
    insidetrainings
WHERE
	CAST(itmaxparticipants AS INT) > (SELECT COUNT(*) FROM regularuserhasinsidetrainings WHERE insidetrainingsitid = insidetrainings.itid);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_all_outside_trainings_data()
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    local TEXT,
	sala TEXT,
    min INT,
    max INT,
    descricao TEXT,
    start BOOLEAN,
	hinicio TEXT
) AS $$
BEGIN
    RETURN QUERY
     SELECT 
	 	otid as id,
	 	otname AS treino,
		otstartdate AS inicio,
        otnumofmin AS duracao,
        oteventtype AS local,
		otlocation AS sala,
        CAST(otminparticipants AS INT) AS min,
        CAST(otmaxparticipants AS INT) AS max,
		otdescription AS descricao,
        otstarted AS start,
		otstarttime AS inicio

    from
        outsidetrainings
    where 
    	CAST(otmaxparticipants AS INT) > (SELECT COUNT(*) FROM regularuserhasoutsidetrainings WHERE outsidetrainingsitid = outsidetrainings.otid);

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_outside_trainings_data(regular_user_id INT)
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    local TEXT,
	sala TEXT,
    min TEXT,
    max TEXT,
    descricao TEXT,
    start BOOLEAN,
	hinicio TEXT
) AS $$
BEGIN
    RETURN QUERY
SELECT 
	 	otid AS id,
	 	otname AS treino,
        otnumofmin AS inicio,
        oteventtype AS duracao,
        oteventtype AS local,
		otlocation AS sala,
        otminparticipants AS min,
        otmaxparticipants AS max,
		otdescription AS descricao,
        otstarted AS start,
		otstarttime AS inicio
    FROM
       public.regularuserhasoutsidetrainings t
    JOIN
        outsidetrainings o ON outsidetrainingsitid = outsideteacherotid
	where regularuserruid = regular_user_id;

END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION get_user_inside_training_id(Ruid INT)
RETURNS TABLE (
	id INT
	) AS $$ 
BEGIN 
	RETURN QUERY
	select insidetrainingsitid from regularuserhasinsidetrainings
	where regularuserruid = Ruid;
	END;
	$$ LANGUAGE plpgsql;
    
	
CREATE OR REPLACE FUNCTION get_user_outside_training_id(Ruid INT)
RETURNS TABLE (
	id INT
	) AS $$ 
BEGIN 
	RETURN QUERY
	select outsidetrainingsitid from regularuserhasoutsidetrainings
	where regularuserruid = Ruid;
	END;
	$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION training_request(trainingid INT, userid INT) RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN
    BEGIN
        INSERT INTO public.regularuserhasinsidetrainings (regularuserruid, insidetrainingsitid)
        VALUES (userid, trainingid);
        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION accept_training_request(trainingid INT, userid INT) RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN
    BEGIN
        UPDATE public.regularuserhasinsidetrainings
        set uhitpending = false, ritflag = true
		where regularuserruid = userid
		and insidetrainingsitid = trainingid;
        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION accept_outside_training_request(trainingid INT, userid INT) RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN
    BEGIN
        UPDATE public.regularuserhasoutsidetrainings
        set uhitpending = false, rotflag = true
		where regularuserruid = userid
		and outsidetrainingsitid = trainingid;
        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deny_outside_training_request(trainingid INT, userid INT) RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN
    BEGIN
        DELETE from public.regularuserhasoutsidetrainings
		where regularuserruid = userid
		and outsidetrainingsitid = trainingid;
        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deny_training_request(trainingid INT, userid INT) RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN
    BEGIN
        DELETE FROM public.regularuserhasinsidetrainings
		where regularuserruid = userid
		and insidetrainingsitid = trainingid;
        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION add_to_training(tid INT,uid INT)
RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN 
	BEGIN
	Insert into regularuserhasinsidetrainings(regularuserruid,insidetrainingsitid,uhitpending)
	values(uid,tid,false);
	        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_to_outside_training(tid INT,uid INT)
RETURNS BOOLEAN AS $$
DECLARE
    success BOOLEAN := false;
BEGIN 
	BEGIN
	Insert into regularuserhasoutsidetrainings(regularuserruid,outsidetrainingsitid,uhitpending)
	values(uid,tid,false);
	        success := true;
    EXCEPTION
        WHEN OTHERS THEN
            success := false;
    END;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION regularuser_has_notification_inside(userid INT) 
RETURNS TABLE (
	id int,
	name text)
 AS $$
BEGIN
        RETURN QUERY
     
		select insidetrainingsitid, itname
		from regularuserhasinsidetrainings , insidetrainings 
		where regularuserruid = userid
		and itid = insidetrainingsitid
		and ritflag = true;
	END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION regularuser_has_notification_outside(userid INT) 
RETURNS TABLE (
	id int,
	name text)
 AS $$
BEGIN
        RETURN QUERY
		select outsidetrainingsitid, otname
		from regularuserhasoutsidetrainings, outsidetrainings
		where regularuserruid = userird
		and otid = outsidetrainingsitid
		and rotflag = true;

    	END;
$$ LANGUAGE plpgsql;

-- TESTES

select * from get_user_info(1)
select * from get_user_team_department(1)
select * from get_user_groups(23)

insert into public."login" (lemail,lpassword) values ('sam@root.pt','root');
insert into public."user" (utype,uemployeenumber,uname,uadminrights,ucity,ucountry,uphoto,urole,useniority,ustartdate)
values(1,1,'Samuel',4,'city','country','none','admin','admin','now')
UPDATE login SET useruid = 1 WHERE lemail = 'sam@root.pt';

select validate_password('sam@root.pt','root')
SELECT getEssentials('sam@root.pt');
call edit_password(1,'123');
select * from getTeamInfo(1)