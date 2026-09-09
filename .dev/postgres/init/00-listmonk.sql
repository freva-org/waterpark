--
-- PostgreSQL database dump
--

\restrict gXegvLbeID06dXF7a4DREdev1V9m5EmLErfZvlhq6ZmFsI5478OBRVgjpH57axf

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_user_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_list_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.subscriber_lists DROP CONSTRAINT IF EXISTS subscriber_lists_subscriber_id_fkey;
ALTER TABLE IF EXISTS ONLY public.subscriber_lists DROP CONSTRAINT IF EXISTS subscriber_lists_list_id_fkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_parent_id_fkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_list_id_fkey;
ALTER TABLE IF EXISTS ONLY public.link_clicks DROP CONSTRAINT IF EXISTS link_clicks_subscriber_id_fkey;
ALTER TABLE IF EXISTS ONLY public.link_clicks DROP CONSTRAINT IF EXISTS link_clicks_link_id_fkey;
ALTER TABLE IF EXISTS ONLY public.link_clicks DROP CONSTRAINT IF EXISTS link_clicks_campaign_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaigns DROP CONSTRAINT IF EXISTS campaigns_template_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaigns DROP CONSTRAINT IF EXISTS campaigns_archive_template_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_views DROP CONSTRAINT IF EXISTS campaign_views_subscriber_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_views DROP CONSTRAINT IF EXISTS campaign_views_campaign_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_media DROP CONSTRAINT IF EXISTS campaign_media_media_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_media DROP CONSTRAINT IF EXISTS campaign_media_campaign_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_lists DROP CONSTRAINT IF EXISTS campaign_lists_list_id_fkey;
ALTER TABLE IF EXISTS ONLY public.campaign_lists DROP CONSTRAINT IF EXISTS campaign_lists_campaign_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bounces DROP CONSTRAINT IF EXISTS bounces_subscriber_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bounces DROP CONSTRAINT IF EXISTS bounces_campaign_id_fkey;
DROP INDEX IF EXISTS public.templates_is_default_idx;
DROP INDEX IF EXISTS public.mat_list_subscriber_stats_idx;
DROP INDEX IF EXISTS public.mat_dashboard_stats_idx;
DROP INDEX IF EXISTS public.mat_dashboard_charts_idx;
DROP INDEX IF EXISTS public.idx_views_subscriber_id;
DROP INDEX IF EXISTS public.idx_views_date;
DROP INDEX IF EXISTS public.idx_views_camp_id;
DROP INDEX IF EXISTS public.idx_subs_updated_at;
DROP INDEX IF EXISTS public.idx_subs_status;
DROP INDEX IF EXISTS public.idx_subs_id_status;
DROP INDEX IF EXISTS public.idx_subs_email;
DROP INDEX IF EXISTS public.idx_subs_created_at;
DROP INDEX IF EXISTS public.idx_sub_lists_sub_id;
DROP INDEX IF EXISTS public.idx_sub_lists_status;
DROP INDEX IF EXISTS public.idx_sub_lists_list_id;
DROP INDEX IF EXISTS public.idx_settings_key;
DROP INDEX IF EXISTS public.idx_sessions;
DROP INDEX IF EXISTS public.idx_roles_name;
DROP INDEX IF EXISTS public.idx_roles;
DROP INDEX IF EXISTS public.idx_media_filename;
DROP INDEX IF EXISTS public.idx_lists_updated_at;
DROP INDEX IF EXISTS public.idx_lists_type;
DROP INDEX IF EXISTS public.idx_lists_status;
DROP INDEX IF EXISTS public.idx_lists_optin;
DROP INDEX IF EXISTS public.idx_lists_name;
DROP INDEX IF EXISTS public.idx_lists_created_at;
DROP INDEX IF EXISTS public.idx_clicks_sub_id;
DROP INDEX IF EXISTS public.idx_clicks_link_id;
DROP INDEX IF EXISTS public.idx_clicks_date;
DROP INDEX IF EXISTS public.idx_clicks_camp_id;
DROP INDEX IF EXISTS public.idx_camps_updated_at;
DROP INDEX IF EXISTS public.idx_camps_status;
DROP INDEX IF EXISTS public.idx_camps_name;
DROP INDEX IF EXISTS public.idx_camps_created_at;
DROP INDEX IF EXISTS public.idx_camp_media_id;
DROP INDEX IF EXISTS public.idx_camp_media_camp_id;
DROP INDEX IF EXISTS public.idx_camp_lists_list_id;
DROP INDEX IF EXISTS public.idx_camp_lists_camp_id;
DROP INDEX IF EXISTS public.idx_bounces_sub_id;
DROP INDEX IF EXISTS public.idx_bounces_source;
DROP INDEX IF EXISTS public.idx_bounces_date;
DROP INDEX IF EXISTS public.idx_bounces_camp_id;
DROP INDEX IF EXISTS public.campaign_lists_campaign_id_list_id_idx;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.templates DROP CONSTRAINT IF EXISTS templates_pkey;
ALTER TABLE IF EXISTS ONLY public.subscribers DROP CONSTRAINT IF EXISTS subscribers_uuid_key;
ALTER TABLE IF EXISTS ONLY public.subscribers DROP CONSTRAINT IF EXISTS subscribers_pkey;
ALTER TABLE IF EXISTS ONLY public.subscribers DROP CONSTRAINT IF EXISTS subscribers_email_key;
ALTER TABLE IF EXISTS ONLY public.subscriber_lists DROP CONSTRAINT IF EXISTS subscriber_lists_pkey;
ALTER TABLE IF EXISTS ONLY public.settings DROP CONSTRAINT IF EXISTS settings_key_key;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.media DROP CONSTRAINT IF EXISTS media_uuid_key;
ALTER TABLE IF EXISTS ONLY public.media DROP CONSTRAINT IF EXISTS media_pkey;
ALTER TABLE IF EXISTS ONLY public.lists DROP CONSTRAINT IF EXISTS lists_uuid_key;
ALTER TABLE IF EXISTS ONLY public.lists DROP CONSTRAINT IF EXISTS lists_pkey;
ALTER TABLE IF EXISTS ONLY public.links DROP CONSTRAINT IF EXISTS links_uuid_key;
ALTER TABLE IF EXISTS ONLY public.links DROP CONSTRAINT IF EXISTS links_url_key;
ALTER TABLE IF EXISTS ONLY public.links DROP CONSTRAINT IF EXISTS links_pkey;
ALTER TABLE IF EXISTS ONLY public.link_clicks DROP CONSTRAINT IF EXISTS link_clicks_pkey;
ALTER TABLE IF EXISTS ONLY public.campaigns DROP CONSTRAINT IF EXISTS campaigns_uuid_key;
ALTER TABLE IF EXISTS ONLY public.campaigns DROP CONSTRAINT IF EXISTS campaigns_pkey;
ALTER TABLE IF EXISTS ONLY public.campaigns DROP CONSTRAINT IF EXISTS campaigns_archive_slug_key;
ALTER TABLE IF EXISTS ONLY public.campaign_views DROP CONSTRAINT IF EXISTS campaign_views_pkey;
ALTER TABLE IF EXISTS ONLY public.campaign_lists DROP CONSTRAINT IF EXISTS campaign_lists_pkey;
ALTER TABLE IF EXISTS ONLY public.bounces DROP CONSTRAINT IF EXISTS bounces_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.templates ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.subscribers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lists ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.links ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.link_clicks ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.campaigns ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.campaign_views ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.campaign_lists ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bounces ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.templates_id_seq;
DROP TABLE IF EXISTS public.templates;
DROP SEQUENCE IF EXISTS public.subscribers_id_seq;
DROP TABLE IF EXISTS public.settings;
DROP TABLE IF EXISTS public.sessions;
DROP SEQUENCE IF EXISTS public.roles_id_seq;
DROP TABLE IF EXISTS public.roles;
DROP SEQUENCE IF EXISTS public.media_id_seq;
DROP TABLE IF EXISTS public.media;
DROP MATERIALIZED VIEW IF EXISTS public.mat_list_subscriber_stats;
DROP MATERIALIZED VIEW IF EXISTS public.mat_dashboard_counts;
DROP TABLE IF EXISTS public.subscribers;
DROP TABLE IF EXISTS public.subscriber_lists;
DROP MATERIALIZED VIEW IF EXISTS public.mat_dashboard_charts;
DROP SEQUENCE IF EXISTS public.lists_id_seq;
DROP TABLE IF EXISTS public.lists;
DROP SEQUENCE IF EXISTS public.links_id_seq;
DROP TABLE IF EXISTS public.links;
DROP SEQUENCE IF EXISTS public.link_clicks_id_seq;
DROP TABLE IF EXISTS public.link_clicks;
DROP SEQUENCE IF EXISTS public.campaigns_id_seq;
DROP TABLE IF EXISTS public.campaigns;
DROP SEQUENCE IF EXISTS public.campaign_views_id_seq;
DROP TABLE IF EXISTS public.campaign_views;
DROP TABLE IF EXISTS public.campaign_media;
DROP SEQUENCE IF EXISTS public.campaign_lists_id_seq;
DROP TABLE IF EXISTS public.campaign_lists;
DROP SEQUENCE IF EXISTS public.bounces_id_seq;
DROP TABLE IF EXISTS public.bounces;
DROP TYPE IF EXISTS public.user_type;
DROP TYPE IF EXISTS public.user_status;
DROP TYPE IF EXISTS public.twofa_type;
DROP TYPE IF EXISTS public.template_type;
DROP TYPE IF EXISTS public.subscription_status;
DROP TYPE IF EXISTS public.subscriber_status;
DROP TYPE IF EXISTS public.role_type;
DROP TYPE IF EXISTS public.list_type;
DROP TYPE IF EXISTS public.list_status;
DROP TYPE IF EXISTS public.list_optin;
DROP TYPE IF EXISTS public.content_type;
DROP TYPE IF EXISTS public.campaign_type;
DROP TYPE IF EXISTS public.campaign_status;
DROP TYPE IF EXISTS public.bounce_type;
DROP EXTENSION IF EXISTS pgcrypto;
--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: bounce_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.bounce_type AS ENUM (
    'soft',
    'hard',
    'complaint'
);


--
-- Name: campaign_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.campaign_status AS ENUM (
    'draft',
    'running',
    'scheduled',
    'paused',
    'cancelled',
    'finished'
);


--
-- Name: campaign_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.campaign_type AS ENUM (
    'regular',
    'optin'
);


--
-- Name: content_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.content_type AS ENUM (
    'richtext',
    'html',
    'plain',
    'markdown',
    'visual'
);


--
-- Name: list_optin; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.list_optin AS ENUM (
    'single',
    'double'
);


--
-- Name: list_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.list_status AS ENUM (
    'active',
    'archived'
);


--
-- Name: list_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.list_type AS ENUM (
    'public',
    'private',
    'temporary'
);


--
-- Name: role_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.role_type AS ENUM (
    'user',
    'list'
);


--
-- Name: subscriber_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.subscriber_status AS ENUM (
    'enabled',
    'disabled',
    'blocklisted'
);


--
-- Name: subscription_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.subscription_status AS ENUM (
    'unconfirmed',
    'confirmed',
    'unsubscribed'
);


--
-- Name: template_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.template_type AS ENUM (
    'campaign',
    'campaign_visual',
    'tx'
);


--
-- Name: twofa_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.twofa_type AS ENUM (
    'none',
    'totp'
);


--
-- Name: user_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_status AS ENUM (
    'enabled',
    'disabled'
);


--
-- Name: user_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_type AS ENUM (
    'user',
    'api'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bounces; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bounces (
    id integer NOT NULL,
    subscriber_id integer NOT NULL,
    campaign_id integer,
    type public.bounce_type DEFAULT 'hard'::public.bounce_type NOT NULL,
    source text DEFAULT ''::text NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: bounces_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bounces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bounces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bounces_id_seq OWNED BY public.bounces.id;


--
-- Name: campaign_lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_lists (
    id bigint NOT NULL,
    campaign_id integer NOT NULL,
    list_id integer,
    list_name text DEFAULT ''::text NOT NULL
);


--
-- Name: campaign_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaign_lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaign_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaign_lists_id_seq OWNED BY public.campaign_lists.id;


--
-- Name: campaign_media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_media (
    campaign_id integer,
    media_id integer,
    filename text DEFAULT ''::text NOT NULL
);


--
-- Name: campaign_views; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_views (
    id bigint NOT NULL,
    campaign_id integer NOT NULL,
    subscriber_id integer,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: campaign_views_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaign_views_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaign_views_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaign_views_id_seq OWNED BY public.campaign_views.id;


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name text NOT NULL,
    subject text NOT NULL,
    from_email text NOT NULL,
    body text NOT NULL,
    body_source text,
    altbody text,
    content_type public.content_type DEFAULT 'richtext'::public.content_type NOT NULL,
    send_at timestamp with time zone,
    headers jsonb DEFAULT '[]'::jsonb NOT NULL,
    attribs jsonb DEFAULT '{}'::jsonb NOT NULL,
    status public.campaign_status DEFAULT 'draft'::public.campaign_status NOT NULL,
    tags character varying(100)[],
    type public.campaign_type DEFAULT 'regular'::public.campaign_type,
    messenger text NOT NULL,
    template_id integer,
    to_send integer DEFAULT 0 NOT NULL,
    sent integer DEFAULT 0 NOT NULL,
    max_subscriber_id integer DEFAULT 0 NOT NULL,
    last_subscriber_id integer DEFAULT 0 NOT NULL,
    archive boolean DEFAULT false NOT NULL,
    archive_slug text,
    archive_template_id integer,
    archive_meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    started_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaigns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaigns_id_seq OWNED BY public.campaigns.id;


--
-- Name: link_clicks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.link_clicks (
    id bigint NOT NULL,
    campaign_id integer,
    link_id integer NOT NULL,
    subscriber_id integer,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: link_clicks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.link_clicks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: link_clicks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.link_clicks_id_seq OWNED BY public.link_clicks.id;


--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    url text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lists (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name text NOT NULL,
    type public.list_type NOT NULL,
    optin public.list_optin DEFAULT 'single'::public.list_optin NOT NULL,
    status public.list_status DEFAULT 'active'::public.list_status NOT NULL,
    tags character varying(100)[],
    description text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: lists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;


--
-- Name: mat_dashboard_charts; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mat_dashboard_charts AS
 WITH clicks AS (
         SELECT json_agg(row_to_json("row".*)) AS json_agg
           FROM ( WITH viewdates AS (
                         SELECT (link_clicks_1.created_at)::date AS to_date,
                            ((link_clicks_1.created_at)::date - '30 days'::interval) AS from_date
                           FROM public.link_clicks link_clicks_1
                          ORDER BY link_clicks_1.id DESC
                         LIMIT 1
                        )
                 SELECT count(*) AS count,
                    (link_clicks.created_at)::date AS date
                   FROM public.link_clicks
                  WHERE ((link_clicks.created_at >= ( SELECT viewdates.from_date
                           FROM viewdates)) AND (link_clicks.created_at < (( SELECT viewdates.to_date
                           FROM viewdates) + '1 day'::interval)))
                  GROUP BY ((link_clicks.created_at)::date)
                  ORDER BY ((link_clicks.created_at)::date)) "row"
        ), views AS (
         SELECT json_agg(row_to_json("row".*)) AS json_agg
           FROM ( WITH viewdates AS (
                         SELECT (campaign_views_1.created_at)::date AS to_date,
                            ((campaign_views_1.created_at)::date - '30 days'::interval) AS from_date
                           FROM public.campaign_views campaign_views_1
                          ORDER BY campaign_views_1.id DESC
                         LIMIT 1
                        )
                 SELECT count(*) AS count,
                    (campaign_views.created_at)::date AS date
                   FROM public.campaign_views
                  WHERE ((campaign_views.created_at >= ( SELECT viewdates.from_date
                           FROM viewdates)) AND (campaign_views.created_at < (( SELECT viewdates.to_date
                           FROM viewdates) + '1 day'::interval)))
                  GROUP BY ((campaign_views.created_at)::date)
                  ORDER BY ((campaign_views.created_at)::date)) "row"
        )
 SELECT now() AS updated_at,
    json_build_object('link_clicks', COALESCE(( SELECT clicks.json_agg
           FROM clicks), '[]'::json), 'campaign_views', COALESCE(( SELECT views.json_agg
           FROM views), '[]'::json)) AS data
  WITH NO DATA;


--
-- Name: subscriber_lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscriber_lists (
    subscriber_id integer NOT NULL,
    list_id integer NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    status public.subscription_status DEFAULT 'unconfirmed'::public.subscription_status NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscribers (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    attribs jsonb DEFAULT '{}'::jsonb NOT NULL,
    status public.subscriber_status DEFAULT 'enabled'::public.subscriber_status NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: mat_dashboard_counts; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mat_dashboard_counts AS
 WITH subs AS (
         SELECT count(*) AS num,
            subscribers.status
           FROM public.subscribers
          GROUP BY subscribers.status
        )
 SELECT now() AS updated_at,
    json_build_object('subscribers', json_build_object('total', ( SELECT sum(subs.num) AS sum
           FROM subs), 'blocklisted', ( SELECT subs.num
           FROM subs
          WHERE (subs.status = 'blocklisted'::public.subscriber_status)), 'orphans', ( SELECT count(subscribers.id) AS count
           FROM (public.subscribers
             LEFT JOIN public.subscriber_lists ON ((subscribers.id = subscriber_lists.subscriber_id)))
          WHERE (subscriber_lists.subscriber_id IS NULL))), 'lists', json_build_object('total', ( SELECT count(*) AS count
           FROM public.lists), 'private', ( SELECT count(*) AS count
           FROM public.lists
          WHERE (lists.type = 'private'::public.list_type)), 'public', ( SELECT count(*) AS count
           FROM public.lists
          WHERE (lists.type = 'public'::public.list_type)), 'optin_single', ( SELECT count(*) AS count
           FROM public.lists
          WHERE (lists.optin = 'single'::public.list_optin)), 'optin_double', ( SELECT count(*) AS count
           FROM public.lists
          WHERE (lists.optin = 'double'::public.list_optin))), 'campaigns', json_build_object('total', ( SELECT count(*) AS count
           FROM public.campaigns), 'by_status', ( SELECT json_object_agg(r.status, r.num) AS json_object_agg
           FROM ( SELECT campaigns.status,
                    count(*) AS num
                   FROM public.campaigns
                  GROUP BY campaigns.status) r)), 'messages', ( SELECT sum(campaigns.sent) AS messages
           FROM public.campaigns)) AS data
  WITH NO DATA;


--
-- Name: mat_list_subscriber_stats; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mat_list_subscriber_stats AS
 SELECT now() AS updated_at,
    lists.id AS list_id,
    subscriber_lists.status,
    count(subscriber_lists.status) AS subscriber_count
   FROM (public.lists
     LEFT JOIN public.subscriber_lists ON ((subscriber_lists.list_id = lists.id)))
  GROUP BY lists.id, subscriber_lists.status
UNION ALL
 SELECT now() AS updated_at,
    0 AS list_id,
    NULL::public.subscription_status AS status,
    count(subscribers.id) AS subscriber_count
   FROM public.subscribers
  WITH NO DATA;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    provider text DEFAULT ''::text NOT NULL,
    filename text NOT NULL,
    content_type text DEFAULT 'application/octet-stream'::text NOT NULL,
    thumb text NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    type public.role_type DEFAULT 'user'::public.role_type NOT NULL,
    parent_id integer,
    list_id integer,
    permissions text[] DEFAULT '{}'::text[] NOT NULL,
    name text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    data jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.settings (
    key text NOT NULL,
    value jsonb DEFAULT '{}'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.subscribers_id_seq OWNED BY public.subscribers.id;


--
-- Name: templates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.templates (
    id integer NOT NULL,
    name text NOT NULL,
    type public.template_type DEFAULT 'campaign'::public.template_type NOT NULL,
    subject text NOT NULL,
    body text NOT NULL,
    body_source text,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: templates_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.templates_id_seq OWNED BY public.templates.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password_login boolean DEFAULT false NOT NULL,
    password text,
    email text NOT NULL,
    name text NOT NULL,
    avatar text,
    type public.user_type DEFAULT 'user'::public.user_type NOT NULL,
    user_role_id integer NOT NULL,
    list_role_id integer,
    status public.user_status DEFAULT 'disabled'::public.user_status NOT NULL,
    twofa_type public.twofa_type DEFAULT 'none'::public.twofa_type NOT NULL,
    twofa_key text,
    loggedin_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bounces id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bounces ALTER COLUMN id SET DEFAULT nextval('public.bounces_id_seq'::regclass);


--
-- Name: campaign_lists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_lists ALTER COLUMN id SET DEFAULT nextval('public.campaign_lists_id_seq'::regclass);


--
-- Name: campaign_views id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_views ALTER COLUMN id SET DEFAULT nextval('public.campaign_views_id_seq'::regclass);


--
-- Name: campaigns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns ALTER COLUMN id SET DEFAULT nextval('public.campaigns_id_seq'::regclass);


--
-- Name: link_clicks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link_clicks ALTER COLUMN id SET DEFAULT nextval('public.link_clicks_id_seq'::regclass);


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: lists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: subscribers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribers ALTER COLUMN id SET DEFAULT nextval('public.subscribers_id_seq'::regclass);


--
-- Name: templates id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.templates ALTER COLUMN id SET DEFAULT nextval('public.templates_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bounces; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bounces (id, subscriber_id, campaign_id, type, source, meta, created_at) FROM stdin;
\.


--
-- Data for Name: campaign_lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_lists (id, campaign_id, list_id, list_name) FROM stdin;
1	1	1	Default list
\.


--
-- Data for Name: campaign_media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_media (campaign_id, media_id, filename) FROM stdin;
\.


--
-- Data for Name: campaign_views; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_views (id, campaign_id, subscriber_id, created_at) FROM stdin;
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaigns (id, uuid, name, subject, from_email, body, body_source, altbody, content_type, send_at, headers, attribs, status, tags, type, messenger, template_id, to_send, sent, max_subscriber_id, last_subscriber_id, archive, archive_slug, archive_template_id, archive_meta, started_at, created_at, updated_at) FROM stdin;
1	17c16b28-ffa0-4c73-9f9a-4aedf9a98682	Test campaign	Welcome to listmonk	No Reply <noreply@yoursite.com>	<h3>Hi {{ .Subscriber.FirstName }}!</h3>\n\t\t<p>This is a test e-mail campaign. Your second name is {{ .Subscriber.LastName }} and you are from {{ .Subscriber.Attribs.city }}.</p>\n\t\t<p>Here is a <a href="https://listmonk.app@TrackLink">tracked link</a>.</p>\n\t\t<p>Use the link icon in the editor toolbar or when writing raw HTML or Markdown,\n\t\t\tsimply suffix @TrackLink to the end of a URL to turn it into a tracking link. Example:</p>\n\t\t<pre>&lt;a href=&quot;https:/&zwnj;/listmonk.app&#064;TrackLink&quot;&gt;&lt;/a&gt;</pre>\n\t\t<p>For help, refer to the <a href="https://listmonk.app/docs">documentation</a>.</p>\n\t\t	\N	\N	richtext	\N	[]	{}	draft	{test-campaign}	regular	email	1	0	0	0	0	f	welcome-to-listmonk	2	{"name": "Subscriber"}	\N	2026-09-09 13:03:02.241112+00	2026-09-09 13:03:02.241112+00
\.


--
-- Data for Name: link_clicks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.link_clicks (id, campaign_id, link_id, subscriber_id, created_at) FROM stdin;
\.


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.links (id, uuid, url, created_at) FROM stdin;
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lists (id, uuid, name, type, optin, status, tags, description, created_at, updated_at) FROM stdin;
1	dccb80a8-8538-4795-9cb2-f2ef64f4dc92	Default list	private	single	active	{test}		2026-09-09 13:03:02.11609+00	2026-09-09 13:03:02.11609+00
2	4e894091-a679-4b99-bfff-7ec21ad2e1a6	Opt-in list	public	double	active	{test}		2026-09-09 13:03:02.128066+00	2026-09-09 13:03:02.128066+00
3	21403ce5-ad9a-439f-a132-f0ca409db1f7	Waterpark	public	double	active	{waterpark}	Occasional notices about new datasets on the Waterpark hub, changes to the S3 endpoint, and anything that would break existing notebooks.	2026-09-09 13:39:23.235878+00	2026-09-09 13:39:23.235878+00
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, uuid, provider, filename, content_type, thumb, meta, created_at) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, type, parent_id, list_id, permissions, name, created_at, updated_at) FROM stdin;
1	user	\N	\N	{lists:manage_all,subscribers:get,subscribers:get_all,subscribers:manage,subscribers:import,campaigns:get,campaigns:get_all,lists:get_all,campaigns:get_analytics,webhooks:post_bounce,media:manage,templates:manage,users:get,roles:manage,settings:maintain,campaigns:send,tx:send,bounces:manage,media:get,users:manage,subscribers:sql_query,campaigns:manage,bounces:get,templates:get,roles:get,settings:get,settings:manage,campaigns:manage_all}	Super Admin	2026-09-09 13:03:02.260509+00	2026-09-09 13:03:02.260509+00
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, data, created_at) FROM stdin;
k8kB4DSINE2Cf5BWrLdp37r81rmM0NNOf43UGw8IwtOgR4OHSyX5AKahHSHOuD28	{"user_id": 1, "oidc_token": ""}	2026-09-09 13:30:31.968272
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.settings (key, value, updated_at) FROM stdin;
upload.max_file_size	5000	2026-09-09 13:03:00.719688+00
upload.s3.aws_secret_access_key	""	2026-09-09 13:03:00.719688+00
migrations	["v6.2.0"]	2026-09-09 13:03:01.113357+00
smtp	[{"host": "mailbox", "name": "", "port": 1025, "uuid": "6ccbc2ce-729c-4714-a1bc-dbc705717b78", "enabled": true, "password": "password", "tls_type": "none", "username": "username", "max_conns": 10, "idle_timeout": "15s", "wait_timeout": "5s", "auth_protocol": "none", "email_headers": [], "from_addresses": [], "hello_hostname": "", "max_msg_retries": 2, "msg_retry_delay": "10ms", "tls_skip_verify": false}, {"host": "smtp.gmail.com", "name": "", "port": 465, "uuid": "c4cb8d74-c29b-43c6-9fe2-f865dd9f94a8", "enabled": false, "password": "password", "tls_type": "TLS", "username": "username@gmail.com", "max_conns": 10, "idle_timeout": "15s", "wait_timeout": "5s", "auth_protocol": "login", "email_headers": [], "from_addresses": [], "hello_hostname": "", "max_msg_retries": 2, "msg_retry_delay": "10ms", "tls_skip_verify": false}]	2026-09-09 13:03:00.719688+00
bounce.azure	{"enabled": false, "shared_secret": "", "shared_secret_header": ""}	2026-09-09 13:03:00.719688+00
app.lang	"en"	2026-09-09 13:03:00.719688+00
messengers	[]	2026-09-09 13:03:00.719688+00
app.logo_url	"http://localhost:8000/assets/logo-512.png"	2026-09-09 13:03:00.719688+00
app.root_url	"http://localhost:8000"	2026-09-09 13:03:00.719688+00
app.site_name	"Waterpark"	2026-09-09 13:03:00.719688+00
security.oidc	{"enabled": false, "client_id": "", "provider_url": "", "client_secret": "", "provider_name": "", "auto_create_users": false, "default_list_role_id": null, "default_user_role_id": null}	2026-09-09 13:03:00.719688+00
upload.s3.url	"https://ap-south-1.s3.amazonaws.com"	2026-09-09 13:03:00.719688+00
app.batch_size	1000	2026-09-09 13:03:00.719688+00
app.from_email	"Waterpark <noreply@localhost.com>"	2026-09-09 13:03:00.719688+00
bounce.actions	{"hard": {"count": 1, "action": "blocklist"}, "soft": {"count": 2, "action": "none"}, "complaint": {"count": 1, "action": "blocklist"}}	2026-09-09 13:03:00.719688+00
bounce.enabled	false	2026-09-09 13:03:00.719688+00
maintenance.db	{"vacuum": false, "vacuum_cron_interval": "0 2 * * *"}	2026-09-09 13:03:00.719688+00
app.concurrency	10	2026-09-09 13:03:00.719688+00
app.favicon_url	"http://localhost:8000/assets/favicon.ico"	2026-09-09 13:03:00.719688+00
bounce.postmark	{"enabled": false, "password": "", "username": ""}	2026-09-09 13:03:00.719688+00
upload.provider	"filesystem"	2026-09-09 13:03:00.719688+00
app.message_rate	10	2026-09-09 13:03:00.719688+00
bounce.mailboxes	[{"host": "pop.yoursite.com", "port": 995, "type": "pop", "uuid": "dbde98fe-2f50-44ce-a31c-e72e7cb0f19a", "enabled": false, "password": "password", "username": "username", "return_path": "bounce@listmonk.yoursite.com", "tls_enabled": true, "auth_protocol": "userpass", "scan_interval": "15m", "tls_skip_verify": false}]	2026-09-09 13:03:00.719688+00
security.captcha	{"altcha": {"enabled": false, "complexity": 300000}, "hcaptcha": {"key": "", "secret": "", "enabled": false}}	2026-09-09 13:03:00.719688+00
upload.s3.bucket	""	2026-09-09 13:03:00.719688+00
upload.s3.expiry	"167h"	2026-09-09 13:03:00.719688+00
app.check_updates	true	2026-09-09 13:03:00.719688+00
app.notify_emails	[]	2026-09-09 13:03:00.719688+00
bounce.lettermint	{"key": "", "enabled": false}	2026-09-09 13:03:00.719688+00
upload.extensions	["jpg", "jpeg", "png", "gif", "svg", "*"]	2026-09-09 13:03:00.719688+00
bounce.ses_enabled	false	2026-09-09 13:03:00.719688+00
privacy.allow_wipe	true	2026-09-09 13:03:00.719688+00
privacy.exportable	["profile", "subscriptions", "campaign_views", "link_clicks"]	2026-09-09 13:03:00.719688+00
app.max_send_errors	1000	2026-09-09 13:03:00.719688+00
app.show_optin_page	true	2026-09-09 13:03:00.719688+00
bounce.forwardemail	{"key": "", "enabled": false}	2026-09-09 13:03:00.719688+00
bounce.sendgrid_key	""	2026-09-09 13:03:00.719688+00
privacy.allow_export	true	2026-09-09 13:03:00.719688+00
upload.s3.public_url	""	2026-09-09 13:03:00.719688+00
security.trusted_urls	[]	2026-09-09 13:03:00.719688+00
upload.s3.bucket_path	"/"	2026-09-09 13:03:00.719688+00
upload.s3.bucket_type	"public"	2026-09-09 13:03:00.719688+00
app.cache_slow_queries	false	2026-09-09 13:03:00.719688+00
bounce.sendgrid_enabled	false	2026-09-09 13:03:00.719688+00
bounce.webhooks_enabled	false	2026-09-09 13:03:00.719688+00
privacy.allow_blocklist	true	2026-09-09 13:03:00.719688+00
privacy.record_optin_ip	false	2026-09-09 13:03:00.719688+00
upload.s3.bucket_domain	""	2026-09-09 13:03:00.719688+00
privacy.disable_tracking	false	2026-09-09 13:03:00.719688+00
privacy.domain_allowlist	[]	2026-09-09 13:03:00.719688+00
privacy.domain_blocklist	[]	2026-09-09 13:03:00.719688+00
app.enable_public_archive	true	2026-09-09 13:03:00.719688+00
privacy.allow_preferences	true	2026-09-09 13:03:00.719688+00
app.message_sliding_window	false	2026-09-09 13:03:00.719688+00
appearance.admin.custom_js	""	2026-09-09 13:03:00.719688+00
privacy.unsubscribe_header	true	2026-09-09 13:03:00.719688+00
app.send_optin_confirmation	true	2026-09-09 13:03:00.719688+00
appearance.admin.custom_css	"/* listmonk → Settings → Appearance → Admin → Custom CSS\\n *\\n * One job: make it impossible to mistake the development instance for the\\n * production one. Everything else in the admin UI is fine as it ships and\\n * restyling it only makes upgrades harder.\\n *\\n * Put this in the DEV instance only. Leave the production Admin CSS empty\\n * -- the absence of the bar is what tells you where you are, and a\\n * cosmetic change that has to be kept in step across two instances will\\n * drift.\\n *\\n * The failure this prevents: composing a campaign in the wrong tab and\\n * sending it to the real list. There is no undo for that.\\n */\\n\\nbody::before {\\n  content: \\"DEVELOPMENT — this instance sends to the local mailbox, not to real people\\";\\n  display: block;\\n  position: sticky;\\n  top: 0;\\n  z-index: 100;\\n  padding: 6px 12px;\\n  background: #b3261e;\\n  color: #fff;\\n  font: 600 13px/1.4 system-ui, sans-serif;\\n  letter-spacing: .02em;\\n  text-align: center;\\n}"	2026-09-09 13:03:00.719688+00
appearance.public.custom_js	""	2026-09-09 13:03:00.719688+00
privacy.individual_tracking	false	2026-09-09 13:03:00.719688+00
upload.s3.aws_access_key_id	""	2026-09-09 13:03:00.719688+00
appearance.public.custom_css	"/* listmonk → Settings → Appearance → Public → Custom CSS\\n *\\n * These pages are part of the journey, not a corner of somebody's admin\\n * tool: the confirmation link in every opt-in email lands on /subscription\\n * and the unsubscribe link lands on /subscription/<uuid>. Arriving at a\\n * blue-and-white page with a stranger's logo, from a DKRZ email, is\\n * exactly what a phishing attempt looks like.\\n *\\n * Loaded from /public/custom.css *after* the built-in stylesheet, so\\n * plain overrides win without !important.\\n *\\n * Colours are the Waterpark palette: mkdocs-material teal primary with\\n * amber accent, and the same slate dark scheme.\\n */\\n\\n:root {\\n  --wp-fg: #16211f;\\n  --wp-muted: #5a6b68;\\n  --wp-line: #d8e0de;\\n  --wp-bg: #f4f6f6;\\n  --wp-panel: #ffffff;\\n  --wp-accent: #00695f;\\n  --wp-accent-hover: #004d40;\\n}\\n\\n@media (prefers-color-scheme: dark) {\\n  :root {\\n    --wp-fg: #e3e8e7;\\n    --wp-muted: #9bacaa;\\n    --wp-line: #2b3937;\\n    --wp-bg: #121a19;\\n    --wp-panel: #17211f;\\n    --wp-accent: #4db6ac;\\n    --wp-accent-hover: #80cbc4;\\n  }\\n}\\n\\nbody {\\n  background: var(--wp-bg);\\n  color: var(--wp-fg);\\n  /* The system stack the site uses. listmonk asks for Inter and falls\\n     back to Helvetica, which reads as a different site. */\\n  font-family: system-ui, -apple-system, \\"Segoe UI\\", Roboto, sans-serif;\\n}\\n\\n.wrap {\\n  background: var(--wp-panel);\\n  border: 1px solid var(--wp-line);\\n  border-radius: 3px;\\n  box-shadow: none;\\n}\\n\\n/* Set the logo in Appearance → Public → Logo URL to\\n   https://waterpark.dkrz.de/assets/logo-512.png. This only sizes it. */\\n.header .logo img {\\n  max-height: 56px;\\n  width: auto;\\n}\\n\\nh2,\\nh4 {\\n  color: var(--wp-fg);\\n  font-weight: 700;\\n}\\n\\na {\\n  color: var(--wp-accent);\\n}\\n\\na:hover {\\n  color: var(--wp-accent-hover);\\n}\\n\\nlabel,\\n.small {\\n  color: var(--wp-muted);\\n}\\n\\ninput[type=\\"text\\"],\\ninput[type=\\"email\\"],\\nselect,\\ntextarea {\\n  background: var(--wp-bg);\\n  color: var(--wp-fg);\\n  border: 1px solid var(--wp-line);\\n}\\n\\n.button {\\n  background: var(--wp-accent);\\n  border-radius: 3px;\\n  /* 15px 30px is a lot of button for a one-word action. */\\n  padding: 11px 22px;\\n}\\n\\n.button:hover {\\n  background: var(--wp-accent-hover);\\n  color: #fff;\\n}\\n\\n.button.button-outline {\\n  background: transparent;\\n  border: 1px solid var(--wp-accent);\\n  color: var(--wp-accent);\\n}\\n\\n.button.button-outline:hover {\\n  background: var(--wp-accent);\\n  border-color: var(--wp-accent);\\n  color: #fff;\\n}\\n\\n/* Unsubscribing should be the easy path, not a scary red one. Someone\\n   who wants off the list and cannot find the button reaches for \\"report\\n   as spam\\" instead, which costs the sending domain far more. */\\n.unsub-all,\\n#btn-unsub {\\n  opacity: 1;\\n}\\n\\n.error {\\n  color: #b3261e;\\n}\\n\\nfooter.container {\\n  color: var(--wp-muted);\\n}\\n\\nfooter.container a {\\n  color: var(--wp-muted);\\n}\\n\\n/* Give people a way back to the site they came from. listmonk's footer\\n   only credits listmonk, which leaves a dead end after unsubscribing. */\\nfooter.container::before {\\n  content: \\"waterpark.dkrz.de · \\";\\n}"	2026-09-09 13:03:00.719688+00
upload.filesystem.upload_uri	"/uploads"	2026-09-09 13:03:00.719688+00
upload.s3.aws_default_region	"ap-south-1"	2026-09-09 13:03:00.719688+00
upload.filesystem.upload_path	"uploads"	2026-09-09 13:03:00.719688+00
app.cache_slow_queries_interval	"0 3 * * *"	2026-09-09 13:03:00.719688+00
app.message_sliding_window_rate	10000	2026-09-09 13:03:00.719688+00
app.enable_public_subscription_page	true	2026-09-09 13:03:00.719688+00
app.message_sliding_window_duration	"1h"	2026-09-09 13:03:00.719688+00
app.enable_public_archive_rss_content	true	2026-09-09 13:03:00.719688+00
\.


--
-- Data for Name: subscriber_lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subscriber_lists (subscriber_id, list_id, meta, status, created_at, updated_at) FROM stdin;
1	1	{}	unconfirmed	2026-09-09 13:03:02.142478+00	2026-09-09 13:03:02.142478+00
2	2	{}	unconfirmed	2026-09-09 13:03:02.161569+00	2026-09-09 13:03:02.161569+00
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subscribers (id, uuid, email, name, attribs, status, created_at, updated_at) FROM stdin;
1	4e78ff61-13a9-4eec-be46-6c1f37a5f429	john@example.com	John Doe	{"city": "Bengaluru", "good": true, "type": "known"}	enabled	2026-09-09 13:03:02.142478+00	2026-09-09 13:03:02.142478+00
2	68f19340-aca7-4687-a9ae-c1e42d3f9841	anon@example.com	Anon Doe	{"city": "Bengaluru", "good": true, "type": "unknown"}	enabled	2026-09-09 13:03:02.161569+00	2026-09-09 13:03:02.161569+00
\.


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.templates (id, name, type, subject, body, body_source, is_default, created_at, updated_at) FROM stdin;
1	Default campaign template	campaign		<!doctype html>\n<html>\n    <head>\n        <title>{{ .Campaign.Subject }}</title>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">\n        <base target="_blank">\n        <style>\n            body {\n                background-color: #F0F1F3;\n                font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;\n                font-size: 15px;\n                line-height: 26px;\n                margin: 0;\n                color: #444;\n            }\n\n            pre {\n                background: #f4f4f4f4;\n                padding: 2px;\n            }\n\n            table {\n                width: 100%;\n                border: 1px solid #ddd;\n            }\n            table td {\n                border-color: #ddd;\n                padding: 5px;\n            }\n\n            .wrap {\n                background-color: #fff;\n                padding: 30px;\n                max-width: 525px;\n                margin: 0 auto;\n                border-radius: 5px;\n            }\n\n            .button {\n                background: #0055d4;\n                border-radius: 3px;\n                text-decoration: none !important;\n                color: #fff !important;\n                font-weight: bold;\n                padding: 10px 30px;\n                display: inline-block;\n            }\n            .button:hover {\n                background: #111;\n            }\n\n            .footer {\n                text-align: center;\n                font-size: 12px;\n                color: #888;\n            }\n                .footer a {\n                    color: #888;\n                    margin-right: 5px;\n                }\n\n            .gutter {\n                padding: 30px;\n            }\n\n            img {\n                max-width: 100%;\n                height: auto;\n            }\n\n            a {\n                color: #0055d4;\n            }\n                a:hover {\n                    color: #111;\n                }\n            @media screen and (max-width: 600px) {\n                .wrap {\n                    max-width: auto;\n                }\n                .gutter {\n                    padding: 10px;\n                }\n            }\n        </style>\n    </head>\n<body style="background-color: #F0F1F3;font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;font-size: 15px;line-height: 26px;margin: 0;color: #444;">\n    <div class="gutter" style="padding: 30px;">&nbsp;</div>\n    <div class="wrap" style="background-color: #fff;padding: 30px;max-width: 525px;margin: 0 auto;border-radius: 5px;">\n        {{ template "content" . }}\n    </div>\n    \n    <div class="footer" style="text-align: center;font-size: 12px;color: #888;">\n        <p>\n            <a href="{{ UnsubscribeURL }}" style="color: #888;">{{ L.T "email.unsub" }}</a>\n            &nbsp;&nbsp;\n            <a href="{{ MessageURL }}" style="color: #888;">{{ L.T "email.viewInBrowser" }}</a>\n        </p>\n    </div>\n    <div class="gutter" style="padding: 30px;">&nbsp;{{ TrackView }}</div>\n</body>\n</html>\n	\N	t	2026-09-09 13:03:02.177335+00	2026-09-09 13:03:02.177335+00
2	Default archive template	campaign		<!doctype html>\n<html>\n    <head>\n        <title>{{ .Campaign.Subject }}</title>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">\n        <base target="_blank">\n        <style>\n            body {\n                background-color: #F0F1F3;\n                font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;\n                font-size: 15px;\n                line-height: 26px;\n                margin: 0;\n                color: #444;\n            }\n\n            pre {\n                background: #f4f4f4f4;\n                padding: 2px;\n            }\n\n            table {\n                width: 100%;\n                border: 1px solid #ddd;\n            }\n            table td {\n                border-color: #ddd;\n                padding: 5px;\n            }\n\n            .wrap {\n                background-color: #fff;\n                padding: 30px;\n                max-width: 525px;\n                margin: 0 auto;\n                border-radius: 5px;\n            }\n\n            .button {\n                background: #0055d4;\n                border-radius: 3px;\n                text-decoration: none !important;\n                color: #fff !important;\n                font-weight: bold;\n                padding: 10px 30px;\n                display: inline-block;\n            }\n            .button:hover {\n                background: #111;\n            }\n\n            .footer {\n                text-align: center;\n                font-size: 12px;\n                color: #888;\n            }\n                .footer a {\n                    color: #888;\n                    margin-right: 5px;\n                }\n\n            .gutter {\n                padding: 30px;\n            }\n\n            img {\n                max-width: 100%;\n                height: auto;\n            }\n\n            a {\n                color: #0055d4;\n            }\n                a:hover {\n                    color: #111;\n                }\n            @media screen and (max-width: 600px) {\n                .wrap {\n                    max-width: auto;\n                }\n                .gutter {\n                    padding: 10px;\n                }\n            }\n        </style>\n    </head>\n<body style="background-color: #F0F1F3;font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;font-size: 15px;line-height: 26px;margin: 0;color: #444;">\n    <div class="gutter" style="padding: 30px;">&nbsp;</div>\n    <div class="wrap" style="background-color: #fff;padding: 30px;max-width: 525px;margin: 0 auto;border-radius: 5px;">\n        {{ template "content" . }}\n    </div>\n    \n    <div class="footer" style="text-align: center;font-size: 12px;color: #888;">\n        <p>{{ L.T "public.poweredBy" }} <a href="https://listmonk.app" target="_blank" rel="noreferrer" style="color: #888;">listmonk</a></p>\n    </div>\n</body>\n</html>\n	\N	f	2026-09-09 13:03:02.203385+00	2026-09-09 13:03:02.203385+00
3	Sample transactional template	tx	Welcome {{ .Subscriber.Name }}	<!doctype html>\n<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">\n        <base target="_blank">\n\n        <style>\n            body {\n                background-color: #F0F1F3;\n                font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;\n                font-size: 15px;\n                line-height: 26px;\n                margin: 0;\n                color: #444;\n            }\n\n            pre {\n                background: #f4f4f4f4;\n                padding: 2px;\n            }\n\n            table {\n                width: 100%;\n                border: 1px solid #ddd;\n            }\n            table td {\n                border-color: #ddd;\n                padding: 5px;\n            }\n\n            .wrap {\n                background-color: #fff;\n                padding: 30px;\n                max-width: 525px;\n                margin: 0 auto;\n                border-radius: 5px;\n            }\n\n            .button {\n                background: #0055d4;\n                border-radius: 3px;\n                text-decoration: none !important;\n                color: #fff !important;\n                font-weight: bold;\n                padding: 10px 30px;\n                display: inline-block;\n            }\n            .button:hover {\n                background: #111;\n            }\n\n            .footer {\n                text-align: center;\n                font-size: 12px;\n                color: #888;\n            }\n                .footer a {\n                    color: #888;\n                    margin-right: 5px;\n                }\n\n            .gutter {\n                padding: 30px;\n            }\n\n            img {\n                max-width: 100%;\n                height: auto;\n            }\n\n            a {\n                color: #0055d4;\n            }\n                a:hover {\n                    color: #111;\n                }\n            @media screen and (max-width: 600px) {\n                .wrap {\n                    max-width: auto;\n                }\n                .gutter {\n                    padding: 10px;\n                }\n            }\n        </style>\n    </head>\n<body style="background-color: #F0F1F3;font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif;font-size: 15px;line-height: 26px;margin: 0;color: #444;">\n    <div class="gutter" style="padding: 30px;">&nbsp;</div>\n    <div class="wrap" style="background-color: #fff;padding: 30px;max-width: 525px;margin: 0 auto;border-radius: 5px;">\n        <p>Hello {{ .Subscriber.Name }}</p>\n        <p>\n            <strong>Order number: </strong> {{ .Tx.Data.order_id }}<br />\n            <strong>Shipping date: </strong> {{ .Tx.Data.shipping_date }}<br />\n        </p>\n        <br />\n        <p>\n            Transactional templates supports arbitrary parameters.\n            Render them using <code>.Tx.Data.YourParamName</code>. For more information,\n            see the transactional mailing <a href="https://listmonk.app/docs/transactional">documentation</a>.\n        </p>\n    </div>\n    \n    <div class="footer" style="text-align: center;font-size: 12px;color: #888;">\n        <p>{{ L.T "public.poweredBy" }} <a href="https://listmonk.app" target="_blank" rel="noreferrer" style="color: #888;">listmonk</a></p>\n    </div>\n</body>\n</html>\n	\N	f	2026-09-09 13:03:02.214547+00	2026-09-09 13:03:02.214547+00
4	Sample visual template	campaign_visual		<!doctype html>\n<html>\n  <head>\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n  </head>\n  <body>\n    <div\n      style='background-color:#F5F5F5;color:#262626;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'\n    >\n      <table align="center" width="100%" style="margin:0 auto;max-width:600px;background-color:#FFFFFF" role="presentation" cellspacing="0" cellpadding="0" border="0">\n        <tbody>\n          <tr style="width:100%">\n            <td>\n              <h3 style="font-weight:bold;margin:0;font-size:20px;padding:16px 24px 16px 24px">\n                Hello {{ .Subscriber.Name }}\n              </h3>\n              <div style="font-weight:normal;padding:16px 24px 16px 24px">\n                <p>\n                  This is a test e-mail campaign. Your second name is {{ .Subscriber.LastName }} and this block of text is in Markdown.\n                </p>\n                <p>\n                  Here is a\n                  <a href="https://listmonk.app@TrackLink" target="_blank">tracked link</a>.\n                </p>\n                <p>\n                  Use the link icon in the editor toolbar or when writing raw\n                  HTML or Markdown, simply suffix @TrackLink to the end of a URL\n                  to turn it into a tracking link. Example:\n                </p>\n                <p><a href="https:/‌/listmonk.app@TrackLink"></a></p>\n                <p>\n                  For help, refer to the\n                  <a href="https://listmonk.app/docs" target="_blank">documentation</a>.\n                </p>\n              </div>\n              <div style="padding:16px 0px 16px 0px">\n                <hr style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0"/>\n              </div>\n              <div style="padding:16px 24px 16px 24px">\n                <a href="https://listmonk.app"\n                  style="color:#FFFFFF;font-size:16px;font-weight:bold;background-color:#0055d4;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none"\n                  target="_blank">\n                  <span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30" hidden>&nbsp;</i><![endif]--></span>\n                  <span>This is a button</span>\n                  <span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span>\n                </a>\n              </div>\n              <div style="background-color:#F5F5F5;font-size:12px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px">\n                <p>\n                  <a href="{{ UnsubscribeURL }}" style="color: #888;">{{ L.T "email.unsub" }}</a>\n                  &nbsp;&nbsp;&nbsp;&nbsp;\n                  <a href="{{ MessageURL }}"style="color: #888;">{{ L.T "email.viewInBrowser" }}</a>\n                  {{ TrackView }}\n                </p>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </body>\n</html>\n	{\n  "root": {\n    "type": "EmailLayout",\n    "data": {\n      "backdropColor": "#F5F5F5",\n      "canvasColor": "#FFFFFF",\n      "textColor": "#262626",\n      "fontFamily": "MODERN_SANS",\n      "childrenIds": [\n        "block-1744970939431",\n        "block-1744970976991",\n        "block-1744971036169",\n        "block-1744971054197",\n        "block-1764116602073"\n      ]\n    }\n  },\n  "block-1744970939431": {\n    "type": "Heading",\n    "data": {\n      "props": {\n        "text": "Hello {{ .Subscriber.Name }}",\n        "level": "h3"\n      },\n      "style": {\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 24,\n          "left": 24\n        }\n      }\n    }\n  },\n  "block-1744970976991": {\n    "type": "Text",\n    "data": {\n      "style": {\n        "fontWeight": "normal",\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 24,\n          "left": 24\n        }\n      },\n      "props": {\n        "markdown": true,\n        "text": "This is a test e-mail campaign. Your second name is {{ .Subscriber.LastName }} and this block of text is in Markdown.\\n\\nHere is a [tracked link](https://listmonk.app@TrackLink).\\n\\nUse the link icon in the editor toolbar or when writing raw HTML or Markdown, simply suffix @TrackLink to the end of a URL to turn it into a tracking link. Example:\\n\\n<a href=\\"https:/‌/listmonk.app@TrackLink\\"></a>\\n\\nFor help, refer to the [documentation](https://listmonk.app/docs)."\n      }\n    }\n  },\n  "block-1744971036169": {\n    "type": "Divider",\n    "data": {\n      "style": {\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 0,\n          "left": 0\n        }\n      },\n      "props": {\n        "lineColor": "#CCCCCC"\n      }\n    }\n  },\n  "block-1744971054197": {\n    "type": "Button",\n    "data": {\n      "style": {\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 24,\n          "left": 24\n        }\n      },\n      "props": {\n        "buttonBackgroundColor": "#0055d4",\n        "text": "This is a button",\n        "url": "https://listmonk.app"\n      }\n    }\n  },\n  "block-1764115374178": {\n    "type": "Text",\n    "data": {\n      "style": {\n        "backgroundColor": "#F5F5F5",\n        "fontSize": 12,\n        "fontWeight": "normal",\n        "textAlign": "center",\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 24,\n          "left": 24\n        }\n      },\n      "props": {\n        "markdown": true,\n        "text": "<a href=\\"{{ UnsubscribeURL }}\\" style=\\"color: #888;\\">{{ L.T \\"email.unsub\\" }}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\\"{{ MessageURL }}\\" style=\\"color: #888;\\">{{ L.T \\"email.viewInBrowser\\" }}</a>"\n      }\n    }\n  },\n  "block-1764116602073": {\n    "type": "Text",\n    "data": {\n      "style": {\n        "backgroundColor": "#F5F5F5",\n        "fontSize": 12,\n        "fontWeight": "normal",\n        "textAlign": "center",\n        "padding": {\n          "top": 16,\n          "bottom": 16,\n          "right": 24,\n          "left": 24\n        }\n      },\n      "props": {\n        "markdown": true,\n        "text": "<a href=\\"{{ UnsubscribeURL }}\\" style=\\"color: #888;\\">{{ L.T \\"email.unsub\\" }}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\\"{{ MessageURL }}\\" style=\\"color: #888;\\">{{ L.T \\"email.viewInBrowser\\" }}</a>\\n{{ TrackView }}"\n      }\n    }\n  }\n}\n	f	2026-09-09 13:03:02.224523+00	2026-09-09 13:03:02.224523+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password_login, password, email, name, avatar, type, user_role_id, list_role_id, status, twofa_type, twofa_key, loggedin_at, created_at, updated_at) FROM stdin;
1	waterpark	t	$2a$06$.EtCR0NjuhjKgll/sFeq8upX.gaihOB1eRhVPTHQ4/vAOpebQNqGK	waterpark@listmonk	waterpark	\N	user	1	\N	enabled	none	\N	2026-09-09 13:30:31.943326+00	2026-09-09 13:03:02.276032+00	2026-09-09 13:03:02.276032+00
\.


--
-- Name: bounces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bounces_id_seq', 1, false);


--
-- Name: campaign_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.campaign_lists_id_seq', 1, true);


--
-- Name: campaign_views_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.campaign_views_id_seq', 1, false);


--
-- Name: campaigns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.campaigns_id_seq', 1, true);


--
-- Name: link_clicks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.link_clicks_id_seq', 1, false);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 1, false);


--
-- Name: lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lists_id_seq', 3, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, true);


--
-- Name: subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.subscribers_id_seq', 6, true);


--
-- Name: templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.templates_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: bounces bounces_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bounces
    ADD CONSTRAINT bounces_pkey PRIMARY KEY (id);


--
-- Name: campaign_lists campaign_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_lists
    ADD CONSTRAINT campaign_lists_pkey PRIMARY KEY (id);


--
-- Name: campaign_views campaign_views_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_views
    ADD CONSTRAINT campaign_views_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_archive_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_archive_slug_key UNIQUE (archive_slug);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_uuid_key UNIQUE (uuid);


--
-- Name: link_clicks link_clicks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link_clicks
    ADD CONSTRAINT link_clicks_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: links links_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_url_key UNIQUE (url);


--
-- Name: links links_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_uuid_key UNIQUE (uuid);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: lists lists_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_uuid_key UNIQUE (uuid);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: media media_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_uuid_key UNIQUE (uuid);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: settings settings_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_key_key UNIQUE (key);


--
-- Name: subscriber_lists subscriber_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscriber_lists
    ADD CONSTRAINT subscriber_lists_pkey PRIMARY KEY (subscriber_id, list_id);


--
-- Name: subscribers subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_email_key UNIQUE (email);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: subscribers subscribers_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_uuid_key UNIQUE (uuid);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: campaign_lists_campaign_id_list_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX campaign_lists_campaign_id_list_id_idx ON public.campaign_lists USING btree (campaign_id, list_id);


--
-- Name: idx_bounces_camp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_bounces_camp_id ON public.bounces USING btree (campaign_id);


--
-- Name: idx_bounces_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_bounces_date ON public.bounces USING btree (created_at);


--
-- Name: idx_bounces_source; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_bounces_source ON public.bounces USING btree (source);


--
-- Name: idx_bounces_sub_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_bounces_sub_id ON public.bounces USING btree (subscriber_id);


--
-- Name: idx_camp_lists_camp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camp_lists_camp_id ON public.campaign_lists USING btree (campaign_id);


--
-- Name: idx_camp_lists_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camp_lists_list_id ON public.campaign_lists USING btree (list_id);


--
-- Name: idx_camp_media_camp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camp_media_camp_id ON public.campaign_media USING btree (campaign_id);


--
-- Name: idx_camp_media_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_camp_media_id ON public.campaign_media USING btree (campaign_id, media_id);


--
-- Name: idx_camps_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camps_created_at ON public.campaigns USING btree (created_at);


--
-- Name: idx_camps_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camps_name ON public.campaigns USING btree (name);


--
-- Name: idx_camps_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camps_status ON public.campaigns USING btree (status);


--
-- Name: idx_camps_updated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_camps_updated_at ON public.campaigns USING btree (updated_at);


--
-- Name: idx_clicks_camp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_clicks_camp_id ON public.link_clicks USING btree (campaign_id);


--
-- Name: idx_clicks_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_clicks_date ON public.link_clicks USING btree (created_at);


--
-- Name: idx_clicks_link_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_clicks_link_id ON public.link_clicks USING btree (link_id);


--
-- Name: idx_clicks_sub_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_clicks_sub_id ON public.link_clicks USING btree (subscriber_id);


--
-- Name: idx_lists_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_created_at ON public.lists USING btree (created_at);


--
-- Name: idx_lists_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_name ON public.lists USING btree (name);


--
-- Name: idx_lists_optin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_optin ON public.lists USING btree (optin);


--
-- Name: idx_lists_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_status ON public.lists USING btree (status);


--
-- Name: idx_lists_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_type ON public.lists USING btree (type);


--
-- Name: idx_lists_updated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lists_updated_at ON public.lists USING btree (updated_at);


--
-- Name: idx_media_filename; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_filename ON public.media USING btree (provider, filename);


--
-- Name: idx_roles; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_roles ON public.roles USING btree (parent_id, list_id);


--
-- Name: idx_roles_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_roles_name ON public.roles USING btree (type, name) WHERE (name IS NOT NULL);


--
-- Name: idx_sessions; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions ON public.sessions USING btree (id, created_at);


--
-- Name: idx_settings_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_settings_key ON public.settings USING btree (key);


--
-- Name: idx_sub_lists_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sub_lists_list_id ON public.subscriber_lists USING btree (list_id);


--
-- Name: idx_sub_lists_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sub_lists_status ON public.subscriber_lists USING btree (status);


--
-- Name: idx_sub_lists_sub_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sub_lists_sub_id ON public.subscriber_lists USING btree (subscriber_id);


--
-- Name: idx_subs_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subs_created_at ON public.subscribers USING btree (created_at);


--
-- Name: idx_subs_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_subs_email ON public.subscribers USING btree (lower(email));


--
-- Name: idx_subs_id_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subs_id_status ON public.subscribers USING btree (id, status);


--
-- Name: idx_subs_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subs_status ON public.subscribers USING btree (status);


--
-- Name: idx_subs_updated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subs_updated_at ON public.subscribers USING btree (updated_at);


--
-- Name: idx_views_camp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_views_camp_id ON public.campaign_views USING btree (campaign_id);


--
-- Name: idx_views_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_views_date ON public.campaign_views USING btree (created_at);


--
-- Name: idx_views_subscriber_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_views_subscriber_id ON public.campaign_views USING btree (subscriber_id);


--
-- Name: mat_dashboard_charts_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX mat_dashboard_charts_idx ON public.mat_dashboard_charts USING btree (updated_at);


--
-- Name: mat_dashboard_stats_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX mat_dashboard_stats_idx ON public.mat_dashboard_counts USING btree (updated_at);


--
-- Name: mat_list_subscriber_stats_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX mat_list_subscriber_stats_idx ON public.mat_list_subscriber_stats USING btree (list_id, status);


--
-- Name: templates_is_default_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX templates_is_default_idx ON public.templates USING btree (is_default) WHERE (is_default = true);


--
-- Name: bounces bounces_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bounces
    ADD CONSTRAINT bounces_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: bounces bounces_subscriber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bounces
    ADD CONSTRAINT bounces_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.subscribers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_lists campaign_lists_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_lists
    ADD CONSTRAINT campaign_lists_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_lists campaign_lists_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_lists
    ADD CONSTRAINT campaign_lists_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: campaign_media campaign_media_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_media
    ADD CONSTRAINT campaign_media_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_media campaign_media_media_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_media
    ADD CONSTRAINT campaign_media_media_id_fkey FOREIGN KEY (media_id) REFERENCES public.media(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: campaign_views campaign_views_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_views
    ADD CONSTRAINT campaign_views_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_views campaign_views_subscriber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_views
    ADD CONSTRAINT campaign_views_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.subscribers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: campaigns campaigns_archive_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_archive_template_id_fkey FOREIGN KEY (archive_template_id) REFERENCES public.templates(id) ON DELETE SET NULL;


--
-- Name: campaigns campaigns_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.templates(id) ON DELETE SET NULL;


--
-- Name: link_clicks link_clicks_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link_clicks
    ADD CONSTRAINT link_clicks_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: link_clicks link_clicks_link_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link_clicks
    ADD CONSTRAINT link_clicks_link_id_fkey FOREIGN KEY (link_id) REFERENCES public.links(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: link_clicks link_clicks_subscriber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link_clicks
    ADD CONSTRAINT link_clicks_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.subscribers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: roles roles_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: roles roles_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriber_lists subscriber_lists_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscriber_lists
    ADD CONSTRAINT subscriber_lists_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriber_lists subscriber_lists_subscriber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscriber_lists
    ADD CONSTRAINT subscriber_lists_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.subscribers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_list_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_list_role_id_fkey FOREIGN KEY (list_role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: users users_user_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_id_fkey FOREIGN KEY (user_role_id) REFERENCES public.roles(id) ON DELETE RESTRICT;


--
-- Name: mat_dashboard_charts; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mat_dashboard_charts;


--
-- Name: mat_dashboard_counts; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mat_dashboard_counts;


--
-- Name: mat_list_subscriber_stats; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mat_list_subscriber_stats;


--
-- PostgreSQL database dump complete
--

\unrestrict gXegvLbeID06dXF7a4DREdev1V9m5EmLErfZvlhq6ZmFsI5478OBRVgjpH57axf
