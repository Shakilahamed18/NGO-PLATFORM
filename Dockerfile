# FROM maven:3.9-eclipse-temurin-21 AS build

# WORKDIR /app

# COPY ngo-project/pom.xml .
# COPY ngo-project/src ./src

# RUN mvn clean package -DskipTests

# FROM eclipse-temurin:21-jre

# WORKDIR /app

# COPY --from=build /app/target/*.jar app.jar

# EXPOSE 8080

# ENTRYPOINT ["java", "-jar", "app.jar"]



# Stage 1: Build Spring Boot application
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY ngo-project/pom.xml ./pom.xml
COPY ngo-project/src ./src

RUN mvn clean package -DskipTests


# Stage 2: Run application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Run as non-root user
RUN useradd -r -u 10001 appuser
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
