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
  permission INT
)

AS $$
DECLARE
  idu INT;
BEGIN
  SELECT useruid INTO idu FROM login WHERE lemail = iemail;

  RETURN QUERY
  SELECT u.uid, u.uname, u.uadminrights
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
  dname TEXT,
  tname TEXT,
  uname TEXT,
  urole TEXT,
  lemail TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT d.dname, t.tname, u.uname, u.urole, l.lemail
  FROM team t
  JOIN public."user" u ON u.teamtid = t.tid
  JOIN department d ON t.departmentdid = d.did
  JOIN login l ON l.useruid = u.uid
  WHERE l.useruid = auid;
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
    seniority TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT lemail AS email, uname AS name, ucity AS city, ucountry AS country, urole AS role,
           utype AS type, uemployeenumber AS number, uphoto AS photo,
           ustartdate AS start, useniority AS seniority
    FROM public."user", login l
    JOIN login l ON uid = useruid
    WHERE uid = user_idu
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
    pending BOOLEAN
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
        uhitpending AS pending
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
    min TEXT,
    max TEXT,
    descricao TEXT,
    area TEXT,
    start BOOLEAN
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
    itstarted AS start
FROM
    insidetrainings; 

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_outside_trainings_data(regular_user_id INT)
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    min TEXT,
    max TEXT
) AS $$
BEGIN
    RETURN QUERY
     SELECT 
	 	otid AS id,
	 	otname AS treino,
        otnumofmin AS inicio,
        oteventtype AS duracao,
        otminparticipants AS min,
        otmaxparticipants AS max
    FROM
       public.regularuserhasoutsidetrainings t
    JOIN
        outsidetrainings o ON outsidetrainingsitid = outsideteacherotid
	where regularuserruid = regular_user_id;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_outside_trainings_data()
RETURNS TABLE (
	id INT,
    treino TEXT,
    inicio TEXT,
    duracao TEXT,
    min TEXT,
    max TEXT

) AS $$
BEGIN
    RETURN QUERY
     SELECT 
	 	otid as id,
	 	otname AS treino,
        otnumofmin AS inicio,
        oteventtype AS duracao,
        otminparticipants AS local,
        otmaxparticipants AS max

    from
        outsidetrainings;
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