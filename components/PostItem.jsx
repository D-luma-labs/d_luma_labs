import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Badge from "./Badge";
import { User, UserBadge, useOrbis } from "@orbisclub/components";
import { shortAddress } from "../utils";
import { ExternalLinkIcon, CommentsIcon } from "./Icons";
import { Connection, PublicKey, GetTokenAccountBalance} from "@solana/web3.js";

export default function PostItem({post}) {
  const { orbis, user } = useOrbis();
  const [canVote, setCanVote] = useState(false);
  const context = post.context_details.context_details.displayName

    // useEffect(() => {
    //   const url = `https://mainnet.helius-rpc.com/?api-key=f291f56b-6890-419f-baa7-cbccb0f511ae`
    //   const ownerFornow = "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"
    //   const getAssetsByOwner = async () => {
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         jsonrpc: '2.0',
    //         id: 'my-id',
    //         method: 'getAssetsByOwner',
    //         params: {
    //           ownerAddress: `86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY`,
    //           page: 1, // Starts at 1
    //           limit: 1000,
    //         },
    //       }),
    //     });
    //     const { result } = await response.json();
    //     console.log("Assets by Owner: ", result?.items);
    //     const names = result?.items.map((item) => {
    //       return item.content.metadata.name
    //     })
    //     console.log("these are the names ", names)
    //   };
    //   getAssetsByOwner(); 
    //   // Check if the post context is "suggestion"
    //   if (context === "Suggestions") {
    //     // Check if the user has a particular Solana-based token (e.g., check user's wallet)
    //     // You will need to replace `YOUR_TOKEN_ID` with the actual token ID
    //     // const userHasToken = user && user.wallet && user.wallet.tokens.includes("YOUR_TOKEN_ID");
    //     // setCanVote(userHasToken);
    //     // post.context === "suggestion"
    //     // console.log("this is the usser",user.metadata.address)
    //     console.log("this is the post",post)
    //     console.log("this is the context name",context)
    //   }
    // }, [getAssetsByOwner]);
  return (
    <div className="[&:nth-child(-n+4)]:-order-1 bg-[#F9FAFB] rounded border border-slate-200">
      <div className="relative p-5">
        <div className="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5">
          <div className="grow lg:flex items-center justify-between space-y-5 lg:space-x-6 lg:space-y-0">
            <div>
              <div className="mb-2">
                <h2 className="mb-1">
                  <Link className="text-primary font-semibold hover:underline transition duration-150 ease-in-out" href={"/post/" + post.stream_id}>
                    {post.content.title}
                  </Link>
                </h2>
                <p className="text-sm text-secondary">{post.content.body.substring(0,180)}..</p>
              </div>
              <div className="flex items-center text-sm text-primary flex-row space-x-1.5">
                <User details={post.creator_details} height={35} />
                <UserBadge details={post.creator_details}  />
                <span className="text-secondary">in</span>
                {post.context_details?.context_details &&
                  <Badge title={post.context_details.context_details.displayName ? post.context_details.context_details.displayName : post.context_details.context_details.name} color="#FF9944" />
                }

                <span className="hidden md:flex text-secondary mr-2 ml-2">·</span>

                {/** Show count replies if any */}
                {(post.count_replies && post.count_replies > 0) ?
                  <>
                    <Link href={"/post/" + post.stream_id} className="hidden md:flex text-primary px-2 py-1 font-medium text-xs items-center space-y-2 rounded-md border border-transparent hover:bg-white hover:border-gray-200">{post.count_replies} <CommentsIcon style={{marginLeft: 3}} /></Link>
                    <span className="hidden md:flex text-secondary mr-2 ml-2">·</span>
                  </>
                :
                  <></>
                }

                {/** Render vote button if user can vote for suggestion and also add vote count*/}
                {true && (
                  <Link href={"/post/" + post.stream_id} className="hidden md:flex text-primary px-2 py-1 font-medium text-xs items-center space-y-2 rounded-md border border-transparent hover:bg-white hover:border-gray-200" >
                   <span className='mr-1'>3</span> Vote
                  </Link>
                )}

                {/** Proof link to Cerscan */}
                {post.stream_id &&
                  <Link href={"https://cerscan.com/mainnet/stream/" + post.stream_id} target="_blank" className="hidden md:flex text-primary text-xs bg-white border border-gray-200 rounded-md py-1 px-2 font-medium flex flex-row items-center hover:underline"><ExternalLinkIcon style={{marginRight: 4}} />{shortAddress(post.stream_id, 12)}</Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
