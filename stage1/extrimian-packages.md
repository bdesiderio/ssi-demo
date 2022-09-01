# Paquetes de Extrimian para Manejo de DID

Extrimian dispone de diferentes paquetes NPM realizados en typescript para el manejo y resolución de diferentes funcionalidades

Las agrupamos en:

* did: relacionado a la creación y edición de los did documents
* dwn: relacionado al Decentralized Web Node, que permite la comunicación entre dos agentes que tengan configurado un did.
* kms: Key Management Service, se encarga de la creación, administración y firmas de las claves privadas. El KMS require de un Secure Storage que se encarga de proteger las claves privadas.
* vc: resuelve la verificación de credenciales y la creación del json que podrá ser firmado con el KMS.
* waci: resuelve la problematica de WACI, protocolo de comunicación para el intercambio y presentación de credenciales verificables.