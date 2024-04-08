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

CREATE OR REPLACE FUNCTION getEssentials(
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
  INNER JOIN login l ON u.uid = l.useruid
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

CREATE OR REPLACE FUNCTION getTeamInfo(
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

insert into public."login" (lemail,lpassword) values ('sam@root.pt','root');
insert into public."user" (utype,uemployeenumber,uname,uadminrights,ucity,ucountry,uphoto,urole,useniority,ustartdate)
values(1,1,'Samuel',4,'city','country','none','admin','admin','now')
UPDATE login SET useruid = 1 WHERE lemail = 'sam@root.pt';

select validate_password('sam@root.pt','root')
SELECT getEssentials('sam@root.pt');
call edit_password(1,'123');
select * from getTeamInfo(1)