CREATE CONSTRAINT member_id_unique ON (m:Member) ASSERT m.id IS UNIQUE
CREATE CONSTRAINT member_name_unique ON (m:Member) ASSERT m.membername IS UNIQUE
CREATE CONSTRAINT member_email_unique ON (m:Member) ASSERT m.email IS UNIQUE

