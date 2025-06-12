--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Position; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Position" AS ENUM (
    'GOALKEEPER',
    'DEFENDER',
    'MIDFIELDER',
    'FORWARD'
);


ALTER TYPE public."Position" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'NORMAL',
    'ADMIN',
    'SUPER_ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: TransferType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransferType" AS ENUM (
    'PERMANENT',
    'LOAN',
    'FREE'
);


ALTER TYPE public."TransferType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blacklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blacklist" (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Blacklist" OWNER TO postgres;

--
-- Name: Blacklist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Blacklist_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Blacklist_id_seq" OWNER TO postgres;

--
-- Name: Blacklist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Blacklist_id_seq" OWNED BY public."Blacklist".id;


--
-- Name: Injury; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Injury" (
    id text NOT NULL,
    "playerId" text NOT NULL,
    description text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public."Injury" OWNER TO postgres;

--
-- Name: League; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."League" (
    id text NOT NULL,
    name text NOT NULL,
    country text NOT NULL
);


ALTER TABLE public."League" OWNER TO postgres;

--
-- Name: Match; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Match" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "homeTeamId" text NOT NULL,
    "awayTeamId" text NOT NULL,
    "leagueId" text,
    stadium text NOT NULL
);


ALTER TABLE public."Match" OWNER TO postgres;

--
-- Name: MatchEvent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MatchEvent" (
    id text NOT NULL,
    type text NOT NULL,
    minute integer NOT NULL,
    "matchId" text NOT NULL,
    "playerId" text,
    details text
);


ALTER TABLE public."MatchEvent" OWNER TO postgres;

--
-- Name: Player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Player" (
    id text NOT NULL,
    name text NOT NULL,
    age integer NOT NULL,
    nationality text NOT NULL,
    "position" public."Position" NOT NULL,
    "teamId" text
);


ALTER TABLE public."Player" OWNER TO postgres;

--
-- Name: PlayerStatistics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PlayerStatistics" (
    id text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" text NOT NULL,
    goals integer NOT NULL,
    assists integer NOT NULL,
    passes integer NOT NULL,
    tackles integer NOT NULL,
    saves integer NOT NULL
);


ALTER TABLE public."PlayerStatistics" OWNER TO postgres;

--
-- Name: Team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Team" (
    id text NOT NULL,
    name text NOT NULL,
    coach text NOT NULL,
    stadium text NOT NULL,
    "leagueId" text NOT NULL
);


ALTER TABLE public."Team" OWNER TO postgres;

--
-- Name: TeamStats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TeamStats" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "leagueId" text,
    wins integer NOT NULL,
    draws integer NOT NULL,
    losses integer NOT NULL,
    points integer NOT NULL
);


ALTER TABLE public."TeamStats" OWNER TO postgres;

--
-- Name: Transfer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transfer" (
    id text NOT NULL,
    "playerId" text NOT NULL,
    "fromTeamId" text NOT NULL,
    "toTeamId" text NOT NULL,
    fee integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "transferType" public."TransferType" NOT NULL
);


ALTER TABLE public."Transfer" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."Role" NOT NULL,
    "lastLoginAttempt" timestamp(3) without time zone,
    "loginAttempts" integer DEFAULT 0 NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    enabled boolean DEFAULT true NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Blacklist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blacklist" ALTER COLUMN id SET DEFAULT nextval('public."Blacklist_id_seq"'::regclass);


--
-- Data for Name: Blacklist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blacklist" (id, token, "createdAt") FROM stdin;
\.


--
-- Data for Name: Injury; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Injury" (id, "playerId", description, date, duration) FROM stdin;
73a14f03-dad4-4205-a5da-bc074c0d8bec	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Ankle sprain	2025-06-10 00:00:00	14
e0e468fb-77ed-4ff0-b5dd-6210173ef3c1	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Ankle sprain	2024-06-10 00:00:00	14
96397800-1bec-4aa8-a447-bd3d0b9636dc	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Ankle sprain	2025-07-10 00:00:00	14
431e4d3b-f41d-4225-abd5-7284aa65fcac	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Ankle sprain	2025-07-10 00:00:00	10
d65fed83-757a-4533-9bc6-f180a075f8b4	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Ankle sprain	2025-06-10 00:00:00	14
\.


--
-- Data for Name: League; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."League" (id, name, country) FROM stdin;
55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Premier League	England
51489064-c36e-4e6b-8056-b72768bec19e	La Liga	Spain
3b2f7816-af5f-4d5d-9a15-504647dec8c9	Bundesliga	Germany
1af930c0-dd35-41d3-b136-0ecbcdc109ec	Serie A	Italy
0b700c10-27a3-4512-b919-c91bf8c1fb6e	Ligue 1	France
541d1f1a-c8f5-4496-ab29-b6ce28ef58dc	Test League	France
\.


--
-- Data for Name: Match; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Match" (id, date, "homeTeamId", "awayTeamId", "leagueId", stadium) FROM stdin;
95f2796b-0a07-455f-b635-4eba8b5d87b2	2024-05-01 15:00:00	f14344ec-d1a2-45ec-99ca-91aaa7aef9ef	2fcfb99a-0089-4bc0-96fd-df424e665e1e	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Old Trafford
17afa854-6555-4901-9233-632c317318f4	2024-05-02 17:30:00	6aaa4bd2-aa7c-498c-99e0-67b3211bd988	b614cdc6-e4b3-43d2-9cdf-7aebc9c3901b	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Etihad Stadium
02d661b1-b626-478a-81f3-003ec4fc61a0	2024-05-03 16:00:00	f1db8fb6-dabf-4b24-a579-985488c821fa	93cb5256-1458-4965-93a3-997ccd47b876	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Emirates Stadium
8c408e66-a8af-45ae-8b0f-f26be46e5bdd	2024-12-12 00:00:00	f1db8fb6-dabf-4b24-a579-985488c821fa	93cb5256-1458-4965-93a3-997ccd47b876	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Emirates Stadium
fa8c5755-37e4-4ffc-808f-53264f7a5489	2023-05-03 16:00:00	f1db8fb6-dabf-4b24-a579-985488c821fa	93cb5256-1458-4965-93a3-997ccd47b876	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	Emirates Stadium
\.


--
-- Data for Name: MatchEvent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MatchEvent" (id, type, minute, "matchId", "playerId", details) FROM stdin;
c6ce38d8-3f69-4981-97bc-5764040ecfad	GOAL	10	95f2796b-0a07-455f-b635-4eba8b5d87b2	2859b0c0-bf6a-4e9b-ad8b-d1ac237e7fd6	Powerful shot from the left side
80f52afc-f29f-4a27-bfcf-0eb8f3e09e3a	GOAL	22	95f2796b-0a07-455f-b635-4eba8b5d87b2	ddcac68e-7a74-417e-ba7a-cf9e43204299	Fast break and finish
77a59f3d-3980-495b-90ac-7f83dd98083d	YELLOW_CARD	35	95f2796b-0a07-455f-b635-4eba8b5d87b2	f98e1b8d-f487-4ddd-8dd3-252bd6820741	Late challenge
11841e91-c470-4dc7-9f4e-6e798040b4d8	SUBSTITUTION	60	95f2796b-0a07-455f-b635-4eba8b5d87b2	4f63d3d3-026b-44b0-9435-12df2d07704b	Tactical substitution
9f64199e-0ea8-44e7-aa61-0d1c871f440f	RED_CARD	75	95f2796b-0a07-455f-b635-4eba8b5d87b2	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Dangerous foul
\.


--
-- Data for Name: Player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Player" (id, name, age, nationality, "position", "teamId") FROM stdin;
2859b0c0-bf6a-4e9b-ad8b-d1ac237e7fd6	Marcus Rashford	26	England	FORWARD	f14344ec-d1a2-45ec-99ca-91aaa7aef9ef
ddcac68e-7a74-417e-ba7a-cf9e43204299	Mohamed Salah	31	Egypt	FORWARD	2fcfb99a-0089-4bc0-96fd-df424e665e1e
aa0cea43-6720-4b15-a87d-71eee320f07d	Erling Haaland	24	Norway	FORWARD	6aaa4bd2-aa7c-498c-99e0-67b3211bd988
cf8d0e88-49c7-48b3-bed5-1e138d51ae4b	Bukayo Saka	23	England	MIDFIELDER	f1db8fb6-dabf-4b24-a579-985488c821fa
f98e1b8d-f487-4ddd-8dd3-252bd6820741	Enzo Fernández	23	Argentina	MIDFIELDER	b614cdc6-e4b3-43d2-9cdf-7aebc9c3901b
4f63d3d3-026b-44b0-9435-12df2d07704b	James Maddison	27	England	MIDFIELDER	93cb5256-1458-4965-93a3-997ccd47b876
5f07cc76-dd7d-425d-b7d3-2da11cf58566	Youri Tielemans	26	Belgium	MIDFIELDER	c045c8cb-19b3-4850-8437-5cfdb9070c10
0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	Jarrod Bowen	27	England	FORWARD	d9e8bc7a-0f84-43d1-9aca-6b555500fb31
325ac926-6ca4-45b5-8a83-ac96a3367f16	Jordan Pickford	30	England	GOALKEEPER	98ba6161-1c98-4f18-b444-cba32762c59a
dbfdfa2b-3820-447f-85d8-d00fb46d3e17	Ollie Watkins	28	England	FORWARD	943644aa-869c-4534-a0fc-56b218fa46a5
\.


--
-- Data for Name: PlayerStatistics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PlayerStatistics" (id, "playerId", "matchId", goals, assists, passes, tackles, saves) FROM stdin;
455cd1a7-f471-4961-9d4d-e5e0b5b3f180	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	02d661b1-b626-478a-81f3-003ec4fc61a0	2	1	50	4	0
\.


--
-- Data for Name: Team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Team" (id, name, coach, stadium, "leagueId") FROM stdin;
f14344ec-d1a2-45ec-99ca-91aaa7aef9ef	Manchester United	Erik ten Hag	Old Trafford	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
2fcfb99a-0089-4bc0-96fd-df424e665e1e	Liverpool	Jürgen Klopp	Anfield	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
6aaa4bd2-aa7c-498c-99e0-67b3211bd988	Manchester City	Pep Guardiola	Etihad Stadium	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
b614cdc6-e4b3-43d2-9cdf-7aebc9c3901b	Chelsea	Mauricio Pochettino	Stamford Bridge	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
f1db8fb6-dabf-4b24-a579-985488c821fa	Arsenal	Mikel Arteta	Emirates Stadium	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
93cb5256-1458-4965-93a3-997ccd47b876	Tottenham Hotspur	Nuno Espírito Santo	Tottenham Hotspur Stadium	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
c045c8cb-19b3-4850-8437-5cfdb9070c10	Leicester City	Brendan Rodgers	King Power Stadium	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
d9e8bc7a-0f84-43d1-9aca-6b555500fb31	West Ham United	David Moyes	London Stadium	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
98ba6161-1c98-4f18-b444-cba32762c59a	Everton	Sean Dyche	Goodison Park	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
943644aa-869c-4534-a0fc-56b218fa46a5	Aston Villa	Unai Emery	Villa Park	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73
\.


--
-- Data for Name: TeamStats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TeamStats" (id, "teamId", "leagueId", wins, draws, losses, points) FROM stdin;
5a719d73-c5e6-4d48-b227-1235bd000e2f	2fcfb99a-0089-4bc0-96fd-df424e665e1e	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	10	5	3	35
c5320330-c6c0-439f-a210-b21e574203cf	2fcfb99a-0089-4bc0-96fd-df424e665e1e	55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73	10	5	3	35
\.


--
-- Data for Name: Transfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transfer" (id, "playerId", "fromTeamId", "toTeamId", fee, date, "transferType") FROM stdin;
8594fa47-887c-4326-a242-dc945821b8e2	0ecf54a9-b3ef-41a5-96b1-ca632ea623ff	2fcfb99a-0089-4bc0-96fd-df424e665e1e	d9e8bc7a-0f84-43d1-9aca-6b555500fb31	50000000	2024-07-01 00:00:00	PERMANENT
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, "createdAt", role, "lastLoginAttempt", "loginAttempts", "updatedAt", enabled) FROM stdin;
177d785c-f369-4b3b-9efd-32923f2a6fa4	joshDoe	admin4@example.com	$2b$10$PDA3N7yDsVfQtG.TF7H03ujnPcQ4MyjNBc/s/jsylrhRbfuJbyqEy	2025-06-12 04:01:53.566	ADMIN	\N	0	2025-06-12 04:01:53.566	t
e0da228d-93dd-4ee9-9f9f-dc87d0f0a29f	johnDoe	admin1@example.com	$2b$10$5WJgHUzuS.re3YsE3DWDpu5M/.M1V6mEkRes6Q8lcwSYp9Rozrrye	2025-06-12 04:01:53.566	ADMIN	\N	0	2025-06-12 04:01:53.566	t
98cffe8e-f2f7-4cd5-9e11-a3b43ca1a123	janeDoe	admin2@example.com	$2b$10$nvdLv7IQqzImYaRmazd1aeBpFqdmOyRpFzThzTQWSUpk77RHpN14.	2025-06-12 04:01:53.566	ADMIN	\N	0	2025-06-12 04:01:53.566	t
e3cd294a-5145-47a1-8a09-c960bae575d4	jimDoe	admin3@example.com	$2b$10$FHaga.3x5mDgctat4bzRO.puwYqSs/F0/2m3hW6OUz2Y2j9Vvpypm	2025-06-12 04:01:53.566	ADMIN	\N	0	2025-06-12 04:01:53.566	t
0ec18c0d-7e7c-48f7-8015-84d0bf56a236	superadmin_user1	superadmin1@example.com	$2b$10$SPiD41c4QV0pEuVElIvLxuEBAT7qfrCEwNm0do309toP2LLxD5NtG	2025-06-12 04:01:54.264	SUPER_ADMIN	\N	0	2025-06-12 04:01:54.264	t
13563cfd-cc41-4b8c-9be3-65c64f80b85d	superadmin_user2	superadmin2@example.com	$2b$10$PBRZ322gqJ7gYD1.TmCVjuGpeY4v1swfmfhuGOVEcUB5zoOpI2izy	2025-06-12 04:01:54.264	SUPER_ADMIN	\N	0	2025-06-12 04:01:54.264	t
5c89b230-f956-4e08-8232-739c91aa87f9	superadmin_user3	superadmin3@example.com	$2b$10$Z898c2tzNOM0m1Kz8T9ubeD4LyufdNyNtURw.5V3mScySwKCt.AN2	2025-06-12 04:01:54.264	SUPER_ADMIN	\N	0	2025-06-12 04:01:54.264	t
caef80cf-ae27-4d83-a7a6-464eedf52ac5	superadmin_user4	superadmin4@example.com	$2b$10$vn3HXkebJgtCMc67I3Th1O/2.O191QG1.jLTp1hFGgG4zzY/CtnXW	2025-06-12 04:01:54.264	SUPER_ADMIN	\N	0	2025-06-12 04:01:54.264	t
9302cbcd-3199-41b0-bbb0-7f2d65e749be	superadmin_user5	superadmin5@example.com	$2b$10$cvnBDKz4COpFDZksqpo4wuJndmXxgS.qTsT9M4vbcVHwnVEPTziQO	2025-06-12 04:01:54.264	SUPER_ADMIN	\N	0	2025-06-12 04:01:54.264	t
45fffd97-a1e3-495e-82a0-5238eb8cdab2	john_doe	john@example.com	$2b$10$7UHPBCZ9SencgdhGeb.t9.orc4j0oAA6nO.V7QyqYof80iKuJCwwK	2025-06-12 04:01:54.737	NORMAL	\N	0	2025-06-12 04:01:54.737	t
7fb469b0-1c23-4461-89dd-f69fe4109758	jane_doe	jane@example.com	$2b$10$nItZKSND9VG8ptTQds1NYuVSG3UR4fXB3DuSmEqZsjpIiClXVH2HC	2025-06-12 04:01:54.751	NORMAL	\N	0	2025-06-12 04:01:54.751	t
a7a9b3f2-c978-45b8-8644-99f38b5195e7	bob_smith	bob@example.com	$2b$10$ON5XnoEd7dPiMxUPi9i5e.1FXFjtuU0U1T35SVDVUec6J64SEOFi2	2025-06-12 04:01:54.753	NORMAL	\N	0	2025-06-12 04:01:54.753	t
565c993f-efe1-49c8-928b-11582c22b672	alice_williams	alice@example.com	$2b$10$jeYrxcuJUKWPmfjL2WA2i.x1YUHXuoEvaL4NCLWhbXytiqK/ELFDO	2025-06-12 04:01:54.756	NORMAL	\N	0	2025-06-12 04:01:54.756	t
e1135e73-c38c-46b1-9100-f242336a1b13	charlie_brown	charlie@example.com	$2b$10$U6sNBINU1nD5JAGJYCNuYuQSP/oJoMJYxRQvRnSc0NvR1yYkxbZLO	2025-06-12 04:01:54.759	NORMAL	\N	0	2025-06-12 04:01:54.759	t
eacb249d-7c21-42b5-b7f5-b073638b95af	jasonDoe	admin5@example.com	$2b$10$rO3jCzB3m86CgWpuJ4MlBOGnvgIzZ7AvItJ99pHIbSX5K.iz6Fb9C	2025-06-12 04:01:53.566	ADMIN	\N	0	2025-06-12 04:01:55.657	t
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8dbd09e7-5999-47b6-9255-d35698337201	a306684db979a59973230191b433e40f3c8c0f50444e69235b24b2794fa28333	2025-06-11 04:12:31.670492+00	20250504231449_	\N	\N	2025-06-11 04:12:31.643605+00	1
1ad33a27-5af9-4224-98ef-6c64d1b1ae31	1173029fbe86178ca7e6dc7a3e617f9b3902946aa7fe66a40281aeb722fa038b	2025-06-11 04:12:31.712592+00	20250505015237_	\N	\N	2025-06-11 04:12:31.674905+00	1
6a991141-7179-44ed-9cfc-df20f315770c	fa8da90d258bad506738f5f648bb96172a9e241a61967775e5022fe214a4c44c	2025-06-11 04:12:31.727984+00	20250519014417_	\N	\N	2025-06-11 04:12:31.716326+00	1
8f66a531-1ecb-4b61-89d1-7b474da7c288	0867788fa960d094859d531e0073addd4aa381fd14de9695bf1b3ebd8db88c9b	2025-06-11 04:12:31.74341+00	20250521040725_	\N	\N	2025-06-11 04:12:31.731657+00	1
73277653-da6c-49b3-ba5b-d2bd8dc7ecf1	22ed43cebcf189c51074f8f85a7ceb471ff0143af7c0432f1c76a1b18d0844bb	2025-06-11 04:12:31.760557+00	20250521052324_	\N	\N	2025-06-11 04:12:31.746715+00	1
5eb18cae-3b1f-4070-ad8f-bf89fc5f4ed6	668dc13f07eacf775c0f7778d76680d4a5520b0adf0b3db04125413c4538afae	2025-06-11 04:12:31.778005+00	20250521101314_	\N	\N	2025-06-11 04:12:31.764957+00	1
1ba8e6dd-4c57-44b2-a158-d3a52c96e4cd	11bfcf5b7423873b6ed18e93273a6adcb1895cc13ba565d1d285b92cae8cad6e	2025-06-11 04:12:31.793863+00	20250528091757_	\N	\N	2025-06-11 04:12:31.781913+00	1
99c613a2-e750-44e6-9c7e-5c620a0b5817	9cd632e6802b1381b5998f70a0657a20647c8b415dec4a064a49f5f15f72ca10	2025-06-11 04:12:31.812796+00	20250605023405_	\N	\N	2025-06-11 04:12:31.797891+00	1
9ec306a0-fa70-4418-845f-16e14ee5f7a6	4271cd91185cc6ae1339bcd77cf71ccf2a57eac6bedc8738cdabf096bf34cef1	2025-06-11 04:12:31.829966+00	20250605025943_	\N	\N	2025-06-11 04:12:31.81895+00	1
6fc16615-a44f-4ee0-bc78-87802866c09f	d5c9ea6ce68882b3782ab7a166d18429d7c6567d9d6600c942b918c64d4c10da	2025-06-11 04:12:31.848753+00	20250610013023_	\N	\N	2025-06-11 04:12:31.834198+00	1
42ef367c-1bcb-45da-a66a-0db5a03ae58b	6eaf318c9fc55608b6dd0b90c0c773995d8ff6cc05437376e19e7c9c3cafada0	2025-06-11 04:12:31.864785+00	20250611040501_	\N	\N	2025-06-11 04:12:31.851724+00	1
06af6869-62ad-4924-944f-481e26ecdb71	05adcddfcb5a4a6a32aa3c4d56dff5e05fffdfb0828c1b7bc28eff401d2fe052	2025-06-11 04:15:05.50182+00	20250611041505_	\N	\N	2025-06-11 04:15:05.490308+00	1
\.


--
-- Name: Blacklist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Blacklist_id_seq"', 1, false);


--
-- Name: Blacklist Blacklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blacklist"
    ADD CONSTRAINT "Blacklist_pkey" PRIMARY KEY (id);


--
-- Name: Injury Injury_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Injury"
    ADD CONSTRAINT "Injury_pkey" PRIMARY KEY (id);


--
-- Name: League League_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."League"
    ADD CONSTRAINT "League_pkey" PRIMARY KEY (id);


--
-- Name: MatchEvent MatchEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MatchEvent"
    ADD CONSTRAINT "MatchEvent_pkey" PRIMARY KEY (id);


--
-- Name: Match Match_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);


--
-- Name: PlayerStatistics PlayerStatistics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerStatistics"
    ADD CONSTRAINT "PlayerStatistics_pkey" PRIMARY KEY (id);


--
-- Name: Player Player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);


--
-- Name: TeamStats TeamStats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeamStats"
    ADD CONSTRAINT "TeamStats_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: Transfer Transfer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transfer"
    ADD CONSTRAINT "Transfer_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Blacklist_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Blacklist_token_key" ON public."Blacklist" USING btree (token);


--
-- Name: League_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "League_name_key" ON public."League" USING btree (name);


--
-- Name: Team_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Team_name_key" ON public."Team" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Injury Injury_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Injury"
    ADD CONSTRAINT "Injury_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MatchEvent MatchEvent_matchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MatchEvent"
    ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MatchEvent MatchEvent_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MatchEvent"
    ADD CONSTRAINT "MatchEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Match Match_awayTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Match Match_homeTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Match Match_leagueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES public."League"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PlayerStatistics PlayerStatistics_matchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerStatistics"
    ADD CONSTRAINT "PlayerStatistics_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PlayerStatistics PlayerStatistics_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlayerStatistics"
    ADD CONSTRAINT "PlayerStatistics_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Player Player_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TeamStats TeamStats_leagueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeamStats"
    ADD CONSTRAINT "TeamStats_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES public."League"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TeamStats TeamStats_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeamStats"
    ADD CONSTRAINT "TeamStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Team Team_leagueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES public."League"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transfer Transfer_fromTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transfer"
    ADD CONSTRAINT "Transfer_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transfer Transfer_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transfer"
    ADD CONSTRAINT "Transfer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transfer Transfer_toTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transfer"
    ADD CONSTRAINT "Transfer_toTeamId_fkey" FOREIGN KEY ("toTeamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

