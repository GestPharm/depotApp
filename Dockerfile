
# Étape 2 : Build du backend Spring Boot avec Maven
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build

WORKDIR /app

COPY ./* .



RUN mvn -f ./pom.xml clean install -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
RUN apk --no-cache upgrade
COPY --from=backend-build /app/depotHopial/target/depotHopital-0.0.1-SNAPSHOT /app/depotHopial.jar


EXPOSE 8080
CMD ["java", "-jar", "depotHopial.jar"]
