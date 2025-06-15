#Use an official Maven image to build the spring Boot app
FROM maven:3.8.4-openjdk-17 AS build

#Set the workinng directory
WORKDIR /app

# Copy pom.xml and download dependencies first (for layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy entire src code
COPY src ./src

# Package the application (skip tests if needed)
RUN mvn clean package -DskipTests

#Use an offical OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set working directory in the final container
WORKDIR /app

# Copy JAR from the build stage
COPY --from=build /app/target/stms-0.0.1-SNAPSHOT.jar .

# Expose port used by Spring Boot
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/stms-0.0.1-SNAPSHOT.jar"]