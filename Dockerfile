FROM eclipse-temurin:21

WORKDIR /app

COPY NGO-PLATFORM/ngo-project/target/ngo-project-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]