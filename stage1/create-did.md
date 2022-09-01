# Creación de un DID

Para crear un nuevo DID puede utilizarse el paquete '@extrimian/did-registry'. Este paquete permite trabajar con los did method basados en modena. Expone la funcionalidad para crear un nuevo DID y publicarlo. El siguiente ejemplo muestar como crear y registrar un nuevo DID usando éste paquete.

```
async create(
    createApiUrl: string,
    initialPublicKeys: IPublicKeys,
    storage: KMSStorage,
    services?: Service[]
  ): Promise<string> {
    const did = await this.did.create(
      createApiUrl,
      initialPublicKeys,
      storage,
      services,
      true
    );

    return did.canonicalId;
  }
```

* **createApiUrl**: Debe expresarse la URL de un endpoint de un nodo de Modena.
* **initialPublicKeys**: Responde a la siguiente interfaz:

```
interface IPublicKeys {
  recoveryKey?: IJWK;
  updateKey?: IJWK;
  bbsBlsJwk?: IJWK;
  didCommJwk?: IJWK;
}

export interface IJWK {
  kty: string;
  crv: string;
  x: string;
  y: string;
}
```
Si algunas de estas claves opcionales no se pasan, hará uso de un KMS interno para generarlas. 

* **storage**: Representa el Storage del KMS. Esta implementación debe ser proporcionada por quien consume este servicio. Se debe implementar una interfaz que permita guardar datos del KMS. Un ejemplo de esta implementación podría ser a través del Secure Storage del dispositivo móvil. El Storage debe implementar la siguiente interfaz:

```
export interface KMSStorage {
    add(key: string, data: any): Promise<void>;
    get(key: string): Promise<any>;
    getAll(): Promise<Map<string, any>>;
    update(key: string, data: any);
    remove(key: string);
}
```
* **services**: Representa los servicios del DID Document a crear. Debe responder a la siguiente interfaz:

```
export type Service = {
  id: string,
  type: string,
  serviceEndpoint: string | string[] | Record<string, string | string[]>
}
```

## Generación de Claves
La invocación del servicio para la creación de un DID requiere de la generación previa de claves públicas y privadas. Modena trabaja principalmente con claves de Update y Recovery de un DID Document. Estas claves son del tipo sepc21k. Por otro lado, requiere dos claves alternativas:
* **BbsBls2020**: Para la firma de una VC.
* **DIDComm**: Para la comunicación encriptada y authenticada entre agentes. Responde al tipo sepc21k.

Para la generación de claves, disponemos de un KMS que facilita la obtención de estas claves. Sin embargo, puede utilizarse cualquier servicio externo y proveer estas claves públicas a través de la invocación del servicio.

Si alguna de las claves recoveryKey, updateKey, bbsBlsJwk, didCommJwk no se proporcionan al servicio de creación del DID, se utilizará el KMS de Extrimian para crear estas credenciales automáticamente.
