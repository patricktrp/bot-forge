import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8088",
  realm: "cere-os",
  clientId: "webapp",
});

export default keycloak;
