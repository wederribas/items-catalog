-- Catalog App initial dump
-- This file will create all the database schema required to run the app

CREATE TABLE app_user (
    id serial NOT NULL,
    uid text NOT NULL,
    name text NOT NULL,
    avatar text,
    CONSTRAINT pk_app_user_id PRIMARY KEY (id)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE app_user OWNER TO postgres;
COMMENT ON TABLE app_user IS 'Stores the application users data';
COMMENT ON COLUMN app_user.id IS 'Primary key';
COMMENT ON COLUMN app_user.uid IS 'User unique identifier number';
COMMENT ON COLUMN app_user.name IS 'User name';
COMMENT ON COLUMN app_user.avatar IS 'User avatar URL';

CREATE TABLE category (
    id serial NOT NULL,
    name character varying(100) NOT NULL,
    CONSTRAINT pk_category_id PRIMARY KEY (id)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE category OWNER TO postgres;
COMMENT ON TABLE category IS 'Stores the catalog categories';
COMMENT ON COLUMN category.id IS 'Primary key';
COMMENT ON COLUMN category.name IS 'Item name';


CREATE TABLE item (
    id serial NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(1000) NOT NULL,
    image_url text,
    category INTEGER NOT NULL,
    creation_timestamp timestamp without time zone NOT NULL DEFAULT (now())::timestamp(0) without time zone,
    CONSTRAINT pk_item_id PRIMARY KEY (id),
    CONSTRAINT fk_category FOREIGN KEY (category)
        REFERENCES category (id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
    OIDS=FALSE
);
ALTER TABLE item OWNER TO postgres;
COMMENT ON TABLE item IS 'Stores the catalog items';
COMMENT ON COLUMN item.id IS 'Primary key';
COMMENT ON COLUMN item.name IS 'Item name';
COMMENT ON COLUMN item.description IS 'Item description';
COMMENT ON COLUMN item.image_url IS 'Item URL path';
COMMENT ON COLUMN item.category IS 'Item category foreign key';