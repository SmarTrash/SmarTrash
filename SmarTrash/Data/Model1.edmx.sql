
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/25/2022 14:43:15
-- Generated from EDMX file: C:\Users\noy\Desktop\SmarTrash\SmarTrash\SmarTrash\Data\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [bgroup91_prod];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__tblCurren__BinQR__440B1D61]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCurrentThrow] DROP CONSTRAINT [FK__tblCurren__BinQR__440B1D61];
GO
IF OBJECT_ID(N'[dbo].[FK__tblCurren__UserE__44FF419A]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCurrentThrow] DROP CONSTRAINT [FK__tblCurren__UserE__44FF419A];
GO
IF OBJECT_ID(N'[dbo].[FK__tblGift__GiftCat__25869641]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGift] DROP CONSTRAINT [FK__tblGift__GiftCat__25869641];
GO
IF OBJECT_ID(N'[dbo].[FK__tblGiftCo__CityI__3B75D760]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGiftCompetition] DROP CONSTRAINT [FK__tblGiftCo__CityI__3B75D760];
GO
IF OBJECT_ID(N'[dbo].[FK__tblGiftCo__GiftI__3C69FB99]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGiftCompetition] DROP CONSTRAINT [FK__tblGiftCo__GiftI__3C69FB99];
GO
IF OBJECT_ID(N'[dbo].[FK__tblGiftCo__UserE__3D5E1FD2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGiftCompetition] DROP CONSTRAINT [FK__tblGiftCo__UserE__3D5E1FD2];
GO
IF OBJECT_ID(N'[dbo].[FK__tblOrder__City__2B3F6F97]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblOrder] DROP CONSTRAINT [FK__tblOrder__City__2B3F6F97];
GO
IF OBJECT_ID(N'[dbo].[FK__tblOrder__GiftCo__29572725]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblOrder] DROP CONSTRAINT [FK__tblOrder__GiftCo__29572725];
GO
IF OBJECT_ID(N'[dbo].[FK__tblOrder__UserEm__2A4B4B5E]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblOrder] DROP CONSTRAINT [FK__tblOrder__UserEm__2A4B4B5E];
GO
IF OBJECT_ID(N'[dbo].[FK__tblProduc__BinTy__2E1BDC42]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblProduct] DROP CONSTRAINT [FK__tblProduc__BinTy__2E1BDC42];
GO
IF OBJECT_ID(N'[dbo].[FK__tblSelect__IdMon__5EBF139D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblSelectedMonthGift] DROP CONSTRAINT [FK__tblSelect__IdMon__5EBF139D];
GO
IF OBJECT_ID(N'[dbo].[FK__tblSpecif__BinTy__403A8C7D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblSpecificBin] DROP CONSTRAINT [FK__tblSpecif__BinTy__403A8C7D];
GO
IF OBJECT_ID(N'[dbo].[FK__tblSpecif__CityI__5165187F]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblSpecificBin] DROP CONSTRAINT [FK__tblSpecif__CityI__5165187F];
GO
IF OBJECT_ID(N'[dbo].[FK__tblSpecif__Weigh__412EB0B6]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblSpecificBin] DROP CONSTRAINT [FK__tblSpecif__Weigh__412EB0B6];
GO
IF OBJECT_ID(N'[dbo].[FK__tblUser__CityId__21B6055D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblUser] DROP CONSTRAINT [FK__tblUser__CityId__21B6055D];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[tblBinType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblBinType];
GO
IF OBJECT_ID(N'[dbo].[tblCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCategory];
GO
IF OBJECT_ID(N'[dbo].[tblCity]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCity];
GO
IF OBJECT_ID(N'[dbo].[tblCurrentThrow]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCurrentThrow];
GO
IF OBJECT_ID(N'[dbo].[tblGift]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblGift];
GO
IF OBJECT_ID(N'[dbo].[tblGiftCompetition]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblGiftCompetition];
GO
IF OBJECT_ID(N'[dbo].[tblOrder]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblOrder];
GO
IF OBJECT_ID(N'[dbo].[tblProduct]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblProduct];
GO
IF OBJECT_ID(N'[dbo].[tblSelectedMonthGift]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblSelectedMonthGift];
GO
IF OBJECT_ID(N'[dbo].[tblSpecificBin]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblSpecificBin];
GO
IF OBJECT_ID(N'[dbo].[tblUser]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblUser];
GO
IF OBJECT_ID(N'[dbo].[tblWeight]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblWeight];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'tblBinType'
CREATE TABLE [dbo].[tblBinType] (
    [BinTypeId] int IDENTITY(1,1) NOT NULL,
    [BinTypeColor] nvarchar(20)  NOT NULL,
    [MaxWeight] float  NULL,
    [Description] nvarchar(500)  NULL
);
GO

-- Creating table 'tblCategory'
CREATE TABLE [dbo].[tblCategory] (
    [CategoryId] int IDENTITY(1,1) NOT NULL,
    [CategoryName] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'tblCity'
CREATE TABLE [dbo].[tblCity] (
    [CityId] int IDENTITY(1,1) NOT NULL,
    [CityName] nvarchar(255)  NULL
);
GO

-- Creating table 'tblCurrentThrow'
CREATE TABLE [dbo].[tblCurrentThrow] (
    [ThrowNumber] int IDENTITY(1,1) NOT NULL,
    [DateThrow] datetime  NOT NULL,
    [ThrowWeight] float  NOT NULL,
    [ThrowPoints] smallint  NOT NULL,
    [BinQRId] int  NULL,
    [UserEmail] varchar(150)  NULL
);
GO

-- Creating table 'tblGift'
CREATE TABLE [dbo].[tblGift] (
    [GiftId] int IDENTITY(1,1) NOT NULL,
    [GiftName] nvarchar(50)  NOT NULL,
    [GiftDescription] nvarchar(255)  NOT NULL,
    [Brand] nvarchar(50)  NOT NULL,
    [Price] int  NOT NULL,
    [Stock] int  NOT NULL,
    [GiftCategory] int  NULL,
    [GiftImage] varchar(500)  NULL
);
GO

-- Creating table 'tblGiftCompetition'
CREATE TABLE [dbo].[tblGiftCompetition] (
    [CityId] int  NOT NULL,
    [GiftId] int  NOT NULL,
    [Year] smallint  NOT NULL,
    [Month] tinyint  NOT NULL,
    [UserEmail] varchar(150)  NULL
);
GO

-- Creating table 'tblOrder'
CREATE TABLE [dbo].[tblOrder] (
    [OrderNumber] int IDENTITY(1,1) NOT NULL,
    [OrderPhone] char(10)  NOT NULL,
    [GiftCode] int  NULL,
    [UserEmail] varchar(150)  NULL,
    [City] int  NULL,
    [StreetNameAndNumber] nvarchar(20)  NOT NULL,
    [OrderDate] datetime  NULL
);
GO

-- Creating table 'tblProduct'
CREATE TABLE [dbo].[tblProduct] (
    [ProductCode] int IDENTITY(1,1) NOT NULL,
    [ProductDescription] nvarchar(25)  NOT NULL,
    [ProductsImage] nvarchar(1500)  NOT NULL,
    [BinTypeId] int  NULL
);
GO

-- Creating table 'tblScanProduct'
CREATE TABLE [dbo].[tblScanProduct] (
    [ScanNumber] int IDENTITY(1,1) NOT NULL,
    [DateScan] datetime  NOT NULL,
    [UserEmail] varchar(150)  NULL,
    [ProductCode] int  NULL
);
GO

-- Creating table 'tblSpecificBin'
CREATE TABLE [dbo].[tblSpecificBin] (
    [BinQRId] int IDENTITY(1,1) NOT NULL,
    [Longitude] float  NOT NULL,
    [Latitude] float  NOT NULL,
    [Address] nvarchar(255)  NOT NULL,
    [BinTypeId] int  NULL,
    [WeightId] int  NULL,
    [CityId] int  NULL
);
GO

-- Creating table 'tblUser'
CREATE TABLE [dbo].[tblUser] (
    [UserEmail] varchar(150)  NOT NULL,
    [FirstName] nvarchar(30)  NOT NULL,
    [LastName] nvarchar(30)  NOT NULL,
    [Phone] char(10)  NULL,
    [Gender] char(1)  NULL,
    [BirthDate] datetime  NOT NULL,
    [Password] nvarchar(20)  NULL,
    [TotalPoints] int  NULL,
    [Longitude] float  NULL,
    [Latitude] float  NULL,
    [StreetNameAndNumber] nvarchar(255)  NULL,
    [LastGameDate] datetime  NULL,
    [CityId] int  NULL,
    [UserImg] nvarchar(255)  NULL,
    [UserToken] nvarchar(300)  NULL
);
GO

-- Creating table 'tblWeight'
CREATE TABLE [dbo].[tblWeight] (
    [WeightId] int IDENTITY(1,1) NOT NULL,
    [CurrentWeight] float  NULL
);
GO

-- Creating table 'tblSelectedMonthGift'
CREATE TABLE [dbo].[tblSelectedMonthGift] (
    [IdMonthGift] int  NOT NULL,
    [MonthGift] tinyint  NOT NULL,
    [YearGift] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [BinTypeId] in table 'tblBinType'
ALTER TABLE [dbo].[tblBinType]
ADD CONSTRAINT [PK_tblBinType]
    PRIMARY KEY CLUSTERED ([BinTypeId] ASC);
GO

-- Creating primary key on [CategoryId] in table 'tblCategory'
ALTER TABLE [dbo].[tblCategory]
ADD CONSTRAINT [PK_tblCategory]
    PRIMARY KEY CLUSTERED ([CategoryId] ASC);
GO

-- Creating primary key on [CityId] in table 'tblCity'
ALTER TABLE [dbo].[tblCity]
ADD CONSTRAINT [PK_tblCity]
    PRIMARY KEY CLUSTERED ([CityId] ASC);
GO

-- Creating primary key on [ThrowNumber] in table 'tblCurrentThrow'
ALTER TABLE [dbo].[tblCurrentThrow]
ADD CONSTRAINT [PK_tblCurrentThrow]
    PRIMARY KEY CLUSTERED ([ThrowNumber] ASC);
GO

-- Creating primary key on [GiftId] in table 'tblGift'
ALTER TABLE [dbo].[tblGift]
ADD CONSTRAINT [PK_tblGift]
    PRIMARY KEY CLUSTERED ([GiftId] ASC);
GO

-- Creating primary key on [CityId], [GiftId], [Year], [Month] in table 'tblGiftCompetition'
ALTER TABLE [dbo].[tblGiftCompetition]
ADD CONSTRAINT [PK_tblGiftCompetition]
    PRIMARY KEY CLUSTERED ([CityId], [GiftId], [Year], [Month] ASC);
GO

-- Creating primary key on [OrderNumber] in table 'tblOrder'
ALTER TABLE [dbo].[tblOrder]
ADD CONSTRAINT [PK_tblOrder]
    PRIMARY KEY CLUSTERED ([OrderNumber] ASC);
GO

-- Creating primary key on [ProductCode] in table 'tblProduct'
ALTER TABLE [dbo].[tblProduct]
ADD CONSTRAINT [PK_tblProduct]
    PRIMARY KEY CLUSTERED ([ProductCode] ASC);
GO

-- Creating primary key on [ScanNumber] in table 'tblScanProduct'
ALTER TABLE [dbo].[tblScanProduct]
ADD CONSTRAINT [PK_tblScanProduct]
    PRIMARY KEY CLUSTERED ([ScanNumber] ASC);
GO

-- Creating primary key on [BinQRId] in table 'tblSpecificBin'
ALTER TABLE [dbo].[tblSpecificBin]
ADD CONSTRAINT [PK_tblSpecificBin]
    PRIMARY KEY CLUSTERED ([BinQRId] ASC);
GO

-- Creating primary key on [UserEmail] in table 'tblUser'
ALTER TABLE [dbo].[tblUser]
ADD CONSTRAINT [PK_tblUser]
    PRIMARY KEY CLUSTERED ([UserEmail] ASC);
GO

-- Creating primary key on [WeightId] in table 'tblWeight'
ALTER TABLE [dbo].[tblWeight]
ADD CONSTRAINT [PK_tblWeight]
    PRIMARY KEY CLUSTERED ([WeightId] ASC);
GO

-- Creating primary key on [IdMonthGift] in table 'tblSelectedMonthGift'
ALTER TABLE [dbo].[tblSelectedMonthGift]
ADD CONSTRAINT [PK_tblSelectedMonthGift]
    PRIMARY KEY CLUSTERED ([IdMonthGift] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [BinTypeId] in table 'tblProduct'
ALTER TABLE [dbo].[tblProduct]
ADD CONSTRAINT [FK__tblProduc__BinTy__2E1BDC42]
    FOREIGN KEY ([BinTypeId])
    REFERENCES [dbo].[tblBinType]
        ([BinTypeId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblProduc__BinTy__2E1BDC42'
CREATE INDEX [IX_FK__tblProduc__BinTy__2E1BDC42]
ON [dbo].[tblProduct]
    ([BinTypeId]);
GO

-- Creating foreign key on [BinTypeId] in table 'tblSpecificBin'
ALTER TABLE [dbo].[tblSpecificBin]
ADD CONSTRAINT [FK__tblSpecif__BinTy__403A8C7D]
    FOREIGN KEY ([BinTypeId])
    REFERENCES [dbo].[tblBinType]
        ([BinTypeId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblSpecif__BinTy__403A8C7D'
CREATE INDEX [IX_FK__tblSpecif__BinTy__403A8C7D]
ON [dbo].[tblSpecificBin]
    ([BinTypeId]);
GO

-- Creating foreign key on [GiftCategory] in table 'tblGift'
ALTER TABLE [dbo].[tblGift]
ADD CONSTRAINT [FK__tblGift__GiftCat__25869641]
    FOREIGN KEY ([GiftCategory])
    REFERENCES [dbo].[tblCategory]
        ([CategoryId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblGift__GiftCat__25869641'
CREATE INDEX [IX_FK__tblGift__GiftCat__25869641]
ON [dbo].[tblGift]
    ([GiftCategory]);
GO

-- Creating foreign key on [CityId] in table 'tblGiftCompetition'
ALTER TABLE [dbo].[tblGiftCompetition]
ADD CONSTRAINT [FK__tblGiftCo__CityI__3B75D760]
    FOREIGN KEY ([CityId])
    REFERENCES [dbo].[tblCity]
        ([CityId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [City] in table 'tblOrder'
ALTER TABLE [dbo].[tblOrder]
ADD CONSTRAINT [FK__tblOrder__City__2B3F6F97]
    FOREIGN KEY ([City])
    REFERENCES [dbo].[tblCity]
        ([CityId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblOrder__City__2B3F6F97'
CREATE INDEX [IX_FK__tblOrder__City__2B3F6F97]
ON [dbo].[tblOrder]
    ([City]);
GO

-- Creating foreign key on [CityId] in table 'tblUser'
ALTER TABLE [dbo].[tblUser]
ADD CONSTRAINT [FK__tblUser__CityId__21B6055D]
    FOREIGN KEY ([CityId])
    REFERENCES [dbo].[tblCity]
        ([CityId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblUser__CityId__21B6055D'
CREATE INDEX [IX_FK__tblUser__CityId__21B6055D]
ON [dbo].[tblUser]
    ([CityId]);
GO

-- Creating foreign key on [BinQRId] in table 'tblCurrentThrow'
ALTER TABLE [dbo].[tblCurrentThrow]
ADD CONSTRAINT [FK__tblCurren__BinQR__440B1D61]
    FOREIGN KEY ([BinQRId])
    REFERENCES [dbo].[tblSpecificBin]
        ([BinQRId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblCurren__BinQR__440B1D61'
CREATE INDEX [IX_FK__tblCurren__BinQR__440B1D61]
ON [dbo].[tblCurrentThrow]
    ([BinQRId]);
GO

-- Creating foreign key on [UserEmail] in table 'tblCurrentThrow'
ALTER TABLE [dbo].[tblCurrentThrow]
ADD CONSTRAINT [FK__tblCurren__UserE__44FF419A]
    FOREIGN KEY ([UserEmail])
    REFERENCES [dbo].[tblUser]
        ([UserEmail])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblCurren__UserE__44FF419A'
CREATE INDEX [IX_FK__tblCurren__UserE__44FF419A]
ON [dbo].[tblCurrentThrow]
    ([UserEmail]);
GO

-- Creating foreign key on [GiftId] in table 'tblGiftCompetition'
ALTER TABLE [dbo].[tblGiftCompetition]
ADD CONSTRAINT [FK__tblGiftCo__GiftI__3C69FB99]
    FOREIGN KEY ([GiftId])
    REFERENCES [dbo].[tblGift]
        ([GiftId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblGiftCo__GiftI__3C69FB99'
CREATE INDEX [IX_FK__tblGiftCo__GiftI__3C69FB99]
ON [dbo].[tblGiftCompetition]
    ([GiftId]);
GO

-- Creating foreign key on [GiftCode] in table 'tblOrder'
ALTER TABLE [dbo].[tblOrder]
ADD CONSTRAINT [FK__tblOrder__GiftCo__29572725]
    FOREIGN KEY ([GiftCode])
    REFERENCES [dbo].[tblGift]
        ([GiftId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblOrder__GiftCo__29572725'
CREATE INDEX [IX_FK__tblOrder__GiftCo__29572725]
ON [dbo].[tblOrder]
    ([GiftCode]);
GO

-- Creating foreign key on [UserEmail] in table 'tblGiftCompetition'
ALTER TABLE [dbo].[tblGiftCompetition]
ADD CONSTRAINT [FK__tblGiftCo__UserE__3D5E1FD2]
    FOREIGN KEY ([UserEmail])
    REFERENCES [dbo].[tblUser]
        ([UserEmail])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblGiftCo__UserE__3D5E1FD2'
CREATE INDEX [IX_FK__tblGiftCo__UserE__3D5E1FD2]
ON [dbo].[tblGiftCompetition]
    ([UserEmail]);
GO

-- Creating foreign key on [UserEmail] in table 'tblOrder'
ALTER TABLE [dbo].[tblOrder]
ADD CONSTRAINT [FK__tblOrder__UserEm__2A4B4B5E]
    FOREIGN KEY ([UserEmail])
    REFERENCES [dbo].[tblUser]
        ([UserEmail])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblOrder__UserEm__2A4B4B5E'
CREATE INDEX [IX_FK__tblOrder__UserEm__2A4B4B5E]
ON [dbo].[tblOrder]
    ([UserEmail]);
GO

-- Creating foreign key on [ProductCode] in table 'tblScanProduct'
ALTER TABLE [dbo].[tblScanProduct]
ADD CONSTRAINT [FK__tblScanPr__Produ__31EC6D26]
    FOREIGN KEY ([ProductCode])
    REFERENCES [dbo].[tblProduct]
        ([ProductCode])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblScanPr__Produ__31EC6D26'
CREATE INDEX [IX_FK__tblScanPr__Produ__31EC6D26]
ON [dbo].[tblScanProduct]
    ([ProductCode]);
GO

-- Creating foreign key on [UserEmail] in table 'tblScanProduct'
ALTER TABLE [dbo].[tblScanProduct]
ADD CONSTRAINT [FK__tblScanPr__UserE__30F848ED]
    FOREIGN KEY ([UserEmail])
    REFERENCES [dbo].[tblUser]
        ([UserEmail])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblScanPr__UserE__30F848ED'
CREATE INDEX [IX_FK__tblScanPr__UserE__30F848ED]
ON [dbo].[tblScanProduct]
    ([UserEmail]);
GO

-- Creating foreign key on [WeightId] in table 'tblSpecificBin'
ALTER TABLE [dbo].[tblSpecificBin]
ADD CONSTRAINT [FK__tblSpecif__Weigh__412EB0B6]
    FOREIGN KEY ([WeightId])
    REFERENCES [dbo].[tblWeight]
        ([WeightId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblSpecif__Weigh__412EB0B6'
CREATE INDEX [IX_FK__tblSpecif__Weigh__412EB0B6]
ON [dbo].[tblSpecificBin]
    ([WeightId]);
GO

-- Creating foreign key on [CityId] in table 'tblSpecificBin'
ALTER TABLE [dbo].[tblSpecificBin]
ADD CONSTRAINT [FK__tblSpecif__CityI__5165187F]
    FOREIGN KEY ([CityId])
    REFERENCES [dbo].[tblCity]
        ([CityId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblSpecif__CityI__5165187F'
CREATE INDEX [IX_FK__tblSpecif__CityI__5165187F]
ON [dbo].[tblSpecificBin]
    ([CityId]);
GO

-- Creating foreign key on [IdMonthGift] in table 'tblSelectedMonthGift'
ALTER TABLE [dbo].[tblSelectedMonthGift]
ADD CONSTRAINT [FK__tblSelect__IdMon__59063A47]
    FOREIGN KEY ([IdMonthGift])
    REFERENCES [dbo].[tblGift]
        ([GiftId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------