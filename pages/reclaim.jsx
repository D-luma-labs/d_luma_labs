import { Reclaim } from '@reclaimprotocol/js-sdk'
import { useState } from 'react';
import QRCode from "react-qr-code";
import { GenerateProof } from '@reclaimprotocol/reclaim-connect-react';

export default function ReclaimPage(){

    const [url, setUrl] = useState("")
    const reclaimClient = new Reclaim.ProofRequest("0x0b28F082B70eA22C78efc82f50b0d859cd06cbb0",{ log: true} )

    async function generateVerificationRequest() {
       // const providerId = 'PROVIDER_ID' //TODO: replace with your provider ids you had selected while creating the application

        const providerIds = [
            'a5f71e67-9ab6-4d2f-9e7d-27c1dfa398b7', // instadetails
            '03cdff35-6c27-4626-8231-2b298c3538c0', // LinkedIn Analytics Data
            '309e9bc9-be15-4b46-8212-6cc1c0ce14a2', // Facebook account associated with Instagram.
            'a1775a5c-9664-4c6e-9abb-87ae51d2ccec', // Insta Story Views
            '5dbf61bc-1b14-454c-9c16-bbe4dcf262f6', // Instagram Story Views
            '475b5501-427b-47c8-b007-fb7837cd8b5c', // Twitter Credentials
        ];

        const providerIdsUber = [
            '5e96617c-351c-4f76-a6af-556ee7fcb522', // Uber Us - 2
        ];

        await reclaimClient.addContext(
            (`69ibNjkeigZRS9z7JhUsFqb2qVYYC2Ds8urY3j9hCKj3`),
            ('for d-luma-labs truth chain platform. This will improve the platofrm with authentic data Thanks!!')
        )

        await reclaimClient.buildProofRequest(providerIdsUber[0])

        reclaimClient.setSignature(
            await reclaimClient.generateSignature(
              "0x2a75cd9f48a3bc85b386596fdab0e5fa08d64bbdaf77384c4e8a19669e3e6e21" //TODO : replace with your APP_SECRET
            )
          )


          const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest()
        
            setUrl(requestUrl)

            console.log(url)
            await reclaimClient.startSession({
                onSuccessCallback: proof => {
                  console.log('Verification success', proof)
                  // Your business logic here
                },
                onFailureCallback: error => {
                  console.error('Verification failed', error)
                  // Your business logic here to handle the error
                }
            })
      }
    return (
        <div className="text-black">
            <GenerateProof
                appID='0x0d6830A2c8d00b6D98F33C95c5f1ACc03D5d18bB'
                onProofSubmission={(proofs, sessionId) => { 
                    console.log(sessionId)
                    console.log(proofs)
                    console.log('Proof submitted')
                }}
                onProofSubmissionFailed={() => {
                    console.log('Proof submission failed')
                }}
                customize = { 
                    {
                    triggerButton: { 
                    text: 'Generate Proof', 
                    style: { 

                        } 
                    },
                    modalHeader: { 
                    text: 'SCAN the QR to submit proof', 
                    style: { 

                        } 
                    },
                    proofSubmissionDetails: { 
                    successText: 'Success', 
                    failureText: 'Failed', 
                    style: { 

                        } 
                    }} 
          } 
        />
        </div>
    )
}