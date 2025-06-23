package com.pro.path_finder;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.h2.tools.RunScript;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@SpringBootApplication
@Slf4j
public class PathFinderApplication {

	@Value("${spring.datasource.url}")
	private String dbUrl;
	@Value("${spring.datasource.username}")
	private String dbUsername;
	@Value("${spring.datasource.password}")
	private String dbPassword;

	public static void main(String[] args) {
		SpringApplication.run(PathFinderApplication.class, args);
	}

	@PostConstruct
	public void init() throws SQLException, IOException {
		Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
		RunScript.execute(connection, new FileReader(new ClassPathResource("db/data.sql").getFile()));
	}
}
