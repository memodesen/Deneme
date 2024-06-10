-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: forum
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `uyeler`
--

DROP TABLE IF EXISTS `uyeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uyeler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membertype` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) NOT NULL DEFAULT 'member',
  `namee` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `email` varchar(45) NOT NULL DEFAULT '123456',
  `password` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uyeler`
--

LOCK TABLES `uyeler` WRITE;
/*!40000 ALTER TABLE `uyeler` DISABLE KEYS */;
INSERT INTO `uyeler` VALUES (1,'Member','hasanarslarn','Hasan','Arslan','1988-09-23','Ataşehir Bulvarı Kadıköy İstanbul','1.png','hasan@hotmail.com','hasan123',NULL,NULL,NULL),(2,'Member','hüseyinyilmaz','Hüseyin','Yılmaz','1979-02-17','Zafer Plaza Osmangazi Bursa','','','',NULL,NULL,NULL),(3,'Member','ömerçelik','Ömer','Çelik','1982-03-08','Liman Caddesi Konyaaltı Antalya','3.png','','',NULL,NULL,NULL),(4,'Member','elifkoç','Elif','Koç','1984-04-29','İstasyon Caddesi Kayseri','4.png','','',NULL,NULL,NULL),(5,'Member','zeynepaydemir','Zeynep','Aydemir','1986-11-12','Sancah Mahallesi Cidde Caddesi Çankaya Ankara','','','',NULL,NULL,NULL),(6,'Psychologist','fatmademir','Fatma','Demir','1974-07-20','Gülbahar Hatun Sokak Trabzon','6.png','','',NULL,NULL,'Dr. Marcus Leung is renowned in the field of psychology for his work on human resilience and post-traumatic growth. With a doctorate from the University of Chicago, his academic and field work has taken him from community centers in inner-city neighborhoods to conflict zones abroad, where he applies his expertise to help individuals and communities overcome adversity. Currently, Dr. Leung heads a research lab at Columbia University and frequently speaks at international conferences about his findings and the psychological tools he\'s developed.'),(7,'Member','ayşekaya','Ayşe','Kaya','1976-10-02','Demokrasi Meydanı Eskişehir','','','',NULL,NULL,NULL),(8,'Member','aliöztürk','Ali','Öztürk','1981-01-15','Gazi Mustafa Kemal Bulvarı Bornova İzmir','5.png','','',NULL,NULL,NULL),(9,'Member','velişahin','Veli','Şahin','1987-04-07','Karanfil Sokak Kızılay Ankara','','','',NULL,NULL,NULL),(10,'Member','nehmetarslan','Mehmet','Aslan','1978-08-31','Ulu Camii Mahallesi Adana','','','',NULL,NULL,NULL),(11,'Member','alidemir','Ali','Demir','1995-03-15','Gazi Mahallesi Ankara','','','',NULL,NULL,NULL),(13,'Psychologist','hasanyilmaz','Hasan','Yılmaz','1988-09-23','Ataşehir Bulvarı Kadıköy İstanbul','','','',NULL,NULL,NULL),(14,'Member','huseyincelik','Hüseyin','çelik','1979-02-17','Zafer Plaza Osmangazi Bursa','','','',NULL,NULL,'Dr. Anita Rivera earned her psychology degree from the University of Michigan, where she later pursued her Master\'s and Ph.D., focusing on developmental psychology. Her extensive research on child development and parental influence has made significant contributions to educational policies. Currently, Dr. Rivera works as a school psychologist in New York, applying her research insights to improve student well-being and educational outcomes through innovative counseling programs and teacher training workshops.'),(15,'Member','omerkoc','Ömer','Koç','1982-03-08','Liman Caddesi Konyaaltı Antalya','','','',NULL,NULL,NULL),(16,'Member','elifaydemir','Elif','Aydemir','1984-04-29','İstasyon Caddesi Kayseri','','','',NULL,NULL,NULL),(17,'Member','zeynepdemir','Zeynep','Demir','1986-11-12','Sancah Mahallesi Cidde Caddesi Çankaya Ankara','','','',NULL,NULL,NULL),(18,'Psychologist','fatmakaya','Fatma','Kaya','1974-07-20','Gülbahar Hatun Sokak Trabzon','','','',NULL,NULL,'Dr. Samuel Johnson, a clinical psychologist, has dedicated his career to understanding and treating mood disorders. After receiving his doctoral degree from Harvard University, he completed his residency at the Massachusetts General Hospital. Dr. Johnson’s approach combines psychotherapy with evidence-based medical treatments to provide comprehensive care. He has authored several books on depression and bipolar disorder, which are used as key texts in psychiatric training programs across the country.'),(19,'Member','ayseozturk','Ayşe','Öztürk','1976-10-02','Demokrasi Meydanı Eskişehir','','','',NULL,NULL,NULL),(20,'Member','alisahin','Ali','Şahin','1981-01-15','Gazi Mustafa Kemal Bulvarı Bornova İzmir','','','',NULL,NULL,NULL),(21,'Member','aslan','Veli','Aslan','1987-04-07','Karanfil Sokak Kızılay Ankara',NULL,'','',NULL,NULL,NULL),(22,'Member','mehmetkaya','Mehmet','Kaya','1978-08-31','Ulu Camii Mahallesi Adana',NULL,'','',NULL,NULL,NULL),(23,'Member','hasanarslanbey','Hasan','Arslanbey','1988-09-23','Ataşehir Bulvarı Kadıköy İstanbul',NULL,'','',NULL,NULL,NULL),(24,'Member','huseyinarslan','Hüseyin','Arslan','1979-02-17','Zafer Plaza Osmangazi Bursa',NULL,'','',NULL,NULL,NULL),(25,'Member','omeryılmaz','Ömer','Yılmaz','1982-03-08','Liman Caddesi Konyaaltı Antalya',NULL,'','',NULL,NULL,NULL),(26,'Member','elifcelik','Elif','Çelik','1984-04-29','İstasyon Caddesi Kayseri',NULL,'','',NULL,NULL,NULL),(27,'Psychologist','zeynepkoc','Zeynep','Koç','1986-11-12','Sancah Mahallesi Cidde Caddesi Çankaya Ankara',NULL,'','',NULL,NULL,NULL),(28,'Member','fatmaaydemir','Fatma','Aydemir','1974-07-20','Gülbahar Hatun Sokak Trabzon',NULL,'','',NULL,NULL,NULL),(29,'Member','aysedemir','Ayşe','Demir','1976-10-02','Demokrasi Meydanı Eskişehir',NULL,'','',NULL,NULL,NULL),(30,'Member','alikaya','Ali','Kaya','1981-01-15','Gazi Mustafa Kemal Bulvarı Bornova İzmir',NULL,'','',NULL,NULL,NULL),(31,'Member','veliozturk','Veli','Öztürk','1987-04-07','Karanfil Sokak Kızılay Ankara',NULL,'','',NULL,NULL,NULL),(32,'Member','mehmetsahin','Mehmet','Şahin','1978-08-31','Ulu Camii Mahallesi Adana',NULL,'','',NULL,NULL,NULL),(33,'Member','hasanarslann','Hasan','Arslan','1988-09-23','Ataşehir Bulvarı Kadıköy İstanbul',NULL,'','',NULL,NULL,NULL),(34,'Member','hüuseyinyilmazz','Hüseyin','Yılmaz','1979-02-17','Zafer Plaza Osmangazi Bursa',NULL,'','',NULL,NULL,NULL),(35,'Member','ömerçeilkk','Ömer','Çelik','1982-03-08','Liman Caddesi Konyaaltı Antalya',NULL,'','',NULL,NULL,NULL),(36,'Member','zeynkoc','Zeynep','Koç','1984-04-29','İstasyon Caddesi Kayseri',NULL,'','',NULL,NULL,NULL),(37,'Member','elifay','Elif','Aydemir','1986-11-12','Sancah Mahallesi Cidde Caddesi Çankaya Ankara',NULL,'','',NULL,NULL,NULL),(38,'Member','demf','Fatma','Demir','1974-07-20','Gülbahar Hatun Sokak Trabzon',NULL,'','',NULL,NULL,NULL),(39,'Member','ayşkaya','Ayşe','Kaya','1976-10-02','Demokrasi Meydanı Eskişehir',NULL,'','',NULL,NULL,NULL),(40,'Member','aliöz','Ali','Öztürk','1981-01-15','Gazi Mustafa Kemal Bulvarı Bornova İzmir',NULL,'','',NULL,NULL,NULL),(41,'Member','g2h5j4k1','Veli','Şahin','1987-04-07','Karanfil Sokak Kızılay Ankara',NULL,'','',NULL,NULL,NULL),(42,'Member','x1y6z7r2','Mehmet','Aslan','1978-08-31','Ulu Camii Mahallesi Adana',NULL,'','',NULL,NULL,NULL),(45,'Psychologist','memodesen','Mehmett','koç','2001-06-24','asdfsd','','memo.koc06@hotmail.com','$2b$10$PWZ3roJ9lGkhBmQpocKqye7Qxhu1pTHEDjqwBzxxEKXwDpnKjvA8e','9c0922581b87996f81d3144801bf01ec4561bd17','2024-05-12 11:04:21','Dr. Emily Tan has been a licensed clinical psychologist for over fifteen years, specializing in cognitive-behavioral therapy. After completing her Ph.D. at Stanford University, she focused her research on anxiety disorders, which led to numerous publications in prestigious journals. At her private practice in San Francisco, she integrates her deep understanding of behavioral science with innovative therapeutic techniques, providing her patients with personalized care. Dr. Tan is also an adjunct professor at UC Berkeley, where she teaches advanced courses in psychological theories and methods.'),(46,'Member','memodesenn','Mehmet','Koç','2001-06-24','asdasa','1715509505126-393390793-Black and White Quote with Photo Poverty Poster (1).png','memo.koc0625@gmail.com','$2b$10$A2D2ddiol6ekUIAVft6iEusBFk1uyuX2YHdhhpwE7nUxvSOIlRDOS','dce8ce3456d7a7de5e31c136ac21dbf635c27a84','2024-05-12 11:04:30',NULL),(52,NULL,'memodesennn','Mehmet','Koç',NULL,NULL,NULL,'memo.kocc06@hotmail.com','$2b$10$yTQg0CyEWHelCW/Qn1PwCeVlU2/ykaBRlsFU.K/JjReOOcnFLyGp6',NULL,NULL,NULL);
/*!40000 ALTER TABLE `uyeler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 18:44:17
