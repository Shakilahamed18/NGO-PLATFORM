FROM eclipse-temurin:21

WORKDIR /app

COPY ngo-project/target/*.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java","-jar","app.jar"]