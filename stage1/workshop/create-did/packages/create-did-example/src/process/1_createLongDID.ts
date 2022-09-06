import { KMSClient } from "@extrimian/kms-client";
import { Did } from "@extrimian/did-registry";
import { AssertionMethodPurpuse, KeyAgreementPurpose } from "@extrimian/did-core";
import { LANG, Suite } from "@extrimian/kms-core";
import { SecureStorage } from "../models/secure-storage";


export const createLongDID = async () => {
    const kms = new KMSClient({
        lang: LANG.es,
        storage: new SecureStorage(),
    });

    const updateKey = await kms.create(Suite.ES256k);
    const recoveryKey = await kms.create(Suite.ES256k);

    const didComm = await kms.create(Suite.DIDComm);
    const bbsbls = await kms.create(Suite.Bbsbls2020);

    const didService = new Did();

    const longDID = await didService.createDID({
        updateKey: updateKey.publicKeyJWK,
        recoveryKey: recoveryKey.publicKeyJWK,
        verificationMethods: {
            bbsBls: {
                id: "bbsbls",
                publicKeyJwk: bbsbls.publicKeyJWK,
                purpose: [new AssertionMethodPurpuse()],
            },
            didComm: {
                id: "didComm",
                publicKeyJwk: didComm.publicKeyJWK,
                purpose: [new KeyAgreementPurpose()]
            },
        }
    })

    console.log(longDID);
    return longDID;
};