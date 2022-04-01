USE [master]
GO
/****** Object:  Database [mockupdb]    Script Date: 2022/03/28 8:26:49 ******/
CREATE DATABASE [mockupdb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'mockupdb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\mockupdb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'mockupdb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\mockupdb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [mockupdb] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [mockupdb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [mockupdb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [mockupdb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [mockupdb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [mockupdb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [mockupdb] SET ARITHABORT OFF 
GO
ALTER DATABASE [mockupdb] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [mockupdb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [mockupdb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [mockupdb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [mockupdb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [mockupdb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [mockupdb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [mockupdb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [mockupdb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [mockupdb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [mockupdb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [mockupdb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [mockupdb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [mockupdb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [mockupdb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [mockupdb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [mockupdb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [mockupdb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [mockupdb] SET  MULTI_USER 
GO
ALTER DATABASE [mockupdb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [mockupdb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [mockupdb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [mockupdb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [mockupdb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [mockupdb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [mockupdb] SET QUERY_STORE = OFF
GO
USE [mockupdb]
GO
/****** Object:  User [mockuser]    Script Date: 2022/03/28 8:26:49 ******/
CREATE USER [mockuser] FOR LOGIN [mockuser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [mockuser]
GO
/****** Object:  Table [dbo].[component_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[component_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tabs_id] [nvarchar](50) NOT NULL,
	[componentID] [nvarchar](50) NOT NULL,
	[componentValue] [nvarchar](max) NULL,
	[componentClass] [nvarchar](50) NULL,
	[componentStyle] [nvarchar](max) NULL,
	[componentTypeObj] [nvarchar](50) NOT NULL,
	[componentType] [nvarchar](50) NULL,
	[componentDraggable] [varchar](6) NOT NULL,
	[componentPositionX] [nvarchar](50) NOT NULL,
	[componentPositionY] [nvarchar](50) NOT NULL,
	[componentOptionValues] [nvarchar](50) NULL,
	[componentHREF] [nvarchar](max) NULL,
	[componentName] [nvarchar](50) NULL,
	[componentPlaceholder] [nvarchar](50) NULL,
	[componentColumns] [int] NULL,
	[componentRows] [int] NULL,
 CONSTRAINT [PK_componentList] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[css_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[css_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [nvarchar](50) NOT NULL,
	[css_name] [nvarchar](50) NULL,
	[properties] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[previous_state_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[previous_state_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [nvarchar](50) NOT NULL,
	[tab_id] [nvarchar](50) NOT NULL,
	[tab_sequence] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_previous_state_table] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[projects_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[projects_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[project_id] [nvarchar](50) NOT NULL,
	[project_name] [nvarchar](50) NOT NULL,
	[date] [datetime] NOT NULL,
 CONSTRAINT [PK_projects_table] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tab_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tab_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tab_id] [nvarchar](50) NOT NULL,
	[tab_name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_tab_table] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_content_table]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_content_table](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [nvarchar](50) NOT NULL,
	[table_id] [nvarchar](50) NOT NULL,
	[tbl_content] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2022/03/28 8:26:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[FirstName] [varchar](255) NOT NULL,
	[LastName] [varchar](255) NOT NULL,
	[Email] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [UserName], [Password], [FirstName], [LastName], [Email]) VALUES (1, N'mmiller0001', N'password', N'Mike', N'Miller', N'mike.miller2021@gmail.com')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__A9D105344F224C42]    Script Date: 2022/03/28 8:26:49 ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__C9F28456E668B114]    Script Date: 2022/03/28 8:26:49 ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[component_table] ADD  CONSTRAINT [DF_componentList_componentDraggable]  DEFAULT ((1)) FOR [componentDraggable]
GO
ALTER TABLE [dbo].[previous_state_table]  WITH CHECK ADD  CONSTRAINT [FK_previous_state_table_previous_state_table] FOREIGN KEY([id])
REFERENCES [dbo].[previous_state_table] ([id])
GO
ALTER TABLE [dbo].[previous_state_table] CHECK CONSTRAINT [FK_previous_state_table_previous_state_table]
GO
USE [master]
GO
ALTER DATABASE [mockupdb] SET  READ_WRITE 
GO
