import Link from 'next/link';
import ReactTimeAgo from 'react-time-ago'
import { Orbis, Discussion, User, useOrbis } from "@orbisclub/components";
import { shortAddress, getIpfsLink } from "../utils";
import { ExternalLinkIcon, EditIcon } from "./Icons";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Vote } from '../models/solana';
import * as web3 from '@solana/web3.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** For Markdown support */
import { marked } from 'marked';
import parse from 'html-react-parser';
import { useState } from 'react';
const SUGGESSTION_CONTEXT = 'kjzl6cwe1jw14bb043cfhbh2e5vjuxfxz74ucvyhu9m1k4eja9rvevqw45sku0l'

export default function ArticleContent({post}) {
  const { orbis, user } = useOrbis();
  const [voteCount, setVoteCount] = useState(post?.content?.data?.voteCount || 0)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(false)
 
  /** Will replace classic code <pre> support with a more advanced integration */
  const replacePreWithSyntaxHighlighter = (node) => {
    if (node.type === 'tag' && node.name === 'pre') {
      const codeNode = node.children.find((child) => child.name === 'code');
      const language = codeNode.attribs.class?.split('-')[1] || ''; // Assumes a format like "language-js"
      
      return (
        <SyntaxHighlighter language="javascript" style={theme}>
          {codeNode.children[0].data}
        </SyntaxHighlighter>
      );
    }
  };

  const markdownContent = post.content.body.replace(/\n/g, '  \n');
  const htmlContent = marked(markdownContent);
  const reactComponent = parse(htmlContent, { replace: replacePreWithSyntaxHighlighter });

  const handleVotingLogic = async (event) => {
    event.preventDefault();

    try {
        if(post?.content?.data?.userWalletAddress){
          setVoteCount((prevVoteCount) => prevVoteCount + 1);
          console.log("this is the voteCount ", voteCount)
          setLoading(true)
    
          console.log("this is the voteCount ", voteCount)
          // Create a new object with updated data
          const updatedData = { ...post.content.data, voteCount: post?.content?.data?.voteCount + 1, userWalletAddress: user?.metadata?.address };
      
          // Create a new content object with updated data
          const updatedContent = { ...post.content, data: updatedData };
      
          // Attempt to edit the post with the updated content
          const res = await orbis.editPost(post.stream_id, updatedContent);
      
          if (res.status === 200) {
            setHasVoted(true)
            console.log('Post likes updated successfully');
            setLoading(false)
            toast.success("Vote Successfully!")
            
          } else {
            setVoteCount((prevVoteCount) => prevVoteCount - 1);
            console.error('Failed to update post likes', res);
            setLoading(false);
            toast.error("Failed to vote.");
          }  
        }else{
          toast.warn("Can't vote twice!");
        }
    } catch (error) {
      toast.error("Error occured!");
      console.error('Error updating post likes:', error);
    }
  };
  
 
  console.log("this is the user ", user)
  console.log("this is the post ", post)
  

  const handleTransactionSubmit = async (vote) => {
      if (!publicKey) {
          alert('Please connect your wallet!')
          return
      }

      const buffer = vote.serialize()
      const transaction = new web3.Transaction()

      const [pda] = web3.PublicKey.findProgramAddressSync(
          [publicKey.toBuffer(), new TextEncoder().encode(vote.VoteCount)],
          new web3.PublicKey(VOTE_PROGRAM_ID)
      )

      const instruction = new web3.TransactionInstruction({
          keys: [
              {
                  pubkey: publicKey,
                  isSigner: true,
                  isWritable: false,
              },
              {
                  pubkey: pda,
                  isSigner: false,
                  isWritable: true
              },
              {
                  pubkey: web3.SystemProgram.programId,
                  isSigner: false,
                  isWritable: false
              }
          ],
          data: buffer,
          programId: new web3.PublicKey(VOTE_PROGRAM_ID)
      })

      transaction.add(instruction)

      try {
          let txid = await web3.sendAndConfirmTransaction(connection, transaction, [publicKey])
          console.log("this is the transactionId ", txid)
          alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
          console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
      } catch (e) {
          console.log(JSON.stringify(e))
          alert(JSON.stringify(e))
      }
  }
  return(
    <>
      <article className="w-full mb-8 pr-6">
        {/* Post header */}
        <header>
          <h1 className="h2 text-primary mb-4">{post.content.title}</h1>

          {/** Article Metadata */}
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="text-xs text-secondary flex flex-row items-center flex-wrap">
              {/* Post date & creator details */}
              <span className="text-brand">—</span> <ReactTimeAgo date={post.timestamp * 1000} locale="en-US"/> <span className="text-secondary mr-2 ml-2">·</span>
              <span className="text-primary"><User hover={true} details={post.creator_details} /></span>
              <span className="text-secondary mr-2 ml-2">·</span>

              {/** Proof link to Cerscan */}
              {post.stream_id &&
                <Link href={"https://cerscan.com/mainnet/stream/" + post.stream_id} target="_blank" className="text-gray-800 bg-gray-100 rounded-md py-1 px-2 font-medium flex flex-row items-center hover:underline"><ExternalLinkIcon style={{marginRight: 4}} />{shortAddress(post.stream_id, 12)}</Link>
              }

              {/** Edit button if user is creator of the post */}
              {(user && user.did == post.creator) &&
                <>
                  <span className="text-secondary mr-2 ml-2">·</span>
                  <Link href={"/edit/" + post.stream_id} className="btn-sm py-1.5 btn-brand"><EditIcon style={{marginRight: 4}} />Edit</Link>
                </>
              }

              {user  ?(
                <>
                {SUGGESSTION_CONTEXT === post.context ?
                  <button 
                    className={`btn-sm ml-2 py-1.5 ${hasVoted ? 'btn-gray' : 'btn-brand'}`} // Apply different styles based on voting state
                    onClick={handleVotingLogic}
                    disabled={hasVoted} // Disable the button if user has already voted
                  >
                    {loading ? ( // Render spinner if loading
                      <svg className="animate-spin h-5 w-5 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a7.97 7.97 0 0 1-6.308-3.093c.98-2.4 3.206-4.163 6.308-5.373 3.102 1.21 5.328 2.973 6.308 5.373A7.97 7.97 0 0 1 10 18zm-1-8a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0V10z" clipRule="evenodd" />
                      </svg>
                    )}
                    {hasVoted ? 'Voted' : 'Vote'} {/* Change text based on voting state */}
                  </button>
                 :null}

                {/* This is the vote count */}
                  { post?.content?.data?.voteCount ?
                    <span className='ml-3 text-2xl text-black'>{voteCount}</span>:
                    null
                  }
                </>
              ) : null}
            </div>
          </div>
        </header>

        {/** Display main image if any */}
        {(post.content.media && post.content.media.length > 0) &&
          <img className="w-full mb-4" src={getIpfsLink(post.content.media[0])} alt={post.content.title} />
        }

        {/* Post content */}
        <div className="text-slate-500 space-y-8 article-content">
          {reactComponent}
        </div>

        {/** Show commenting feed only if not new post  */}
        {post.stream_id &&
          <div className="mt-6">
            <Discussion theme={"kjzl6cwe1jw14aud66u347qi7t3ojyjiufjpy9hf3h1trxgise3vodlayt1gu77"} context={post.content.context} master={post.stream_id} />
          </div>
        }

      </article>
    </>
  )
}

export const theme = {
  "code[class*=\"language-\"]": {
    "background": "transparent",
    "color": "#FFFFFF",
    "fontSize": "#12px",
    "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre-wrap",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "2",
    "OTabSize": "2",
    "tabSize": "2",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none"
  },
  "pre[class*=\"language-\"]": {
    "background": "#142438",
    "color": "#FFFFFF",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "fontSize": "#12px",
    "MozTabSize": "2",
    "OTabSize": "2",
    "tabSize": "2",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none",
    "padding": "15px",
    "overflow": "auto",
    "borderRadius": "0.45em"
  },
  "code[class*=\"language-\"]::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"] *::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "pre[class*=\"language-\"] *::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"]::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"] *::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "pre[class*=\"language-\"] *::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  ":not(pre) > code[class*=\"language-\"]": {
    "padding": "0.2em 0.3em",
    "borderRadius": "0.3em",
    "whiteSpace": "normal"
  },
  "comment": {
    "color": "#868B95",
    "fontStyle": "italic"
  },
  "prolog": {
    "color": "hsl(220, 10%, 40%)"
  },
  "cdata": {
    "color": "hsl(220, 10%, 40%)"
  },
  "doctype": {
    "color": "hsl(220, 14%, 71%)"
  },
  "punctuation": {
    "color": "hsl(220, 14%, 71%)"
  },
  "entity": {
    "color": "hsl(220, 14%, 71%)",
    "cursor": "help"
  },
  "attr-name": {
    "color": "#ffd171"
  },
  "class-name": {
    "color": "#ffd171"
  },
  "boolean": {
    "color": "#ffd171"
  },
  "constant": {
    "color": "#ffd171"
  },
  "number": {
    "color": "#ff9944"
  },
  "atrule": {
    "color": "#ffd171"
  },
  "keyword": {
    "color": "#FF99F5"
  },
  "property": {
    "color": "#FF6DFD"
  },
  "tag": {
    "color": "#FF6DFD"
  },
  "symbol": {
    "color": "#FF6DFD"
  },
  "deleted": {
    "color": "#FF6DFD"
  },
  "important": {
    "color": "#FF6DFD"
  },
  "selector": {
    "color": "#c2ff95"
  },
  "string": {
    "color": "#5CF97C"
  },
  "char": {
    "color": "#5CF97C"
  },
  "builtin": {
    "color": "#c2ff95"
  },
  "inserted": {
    "color": "#c2ff95"
  },
  "regex": {
    "color": "#c2ff95"
  },
  "attr-value": {
    "color": "#c2ff95"
  },
  "attr-value > .token.punctuation": {
    "color": "#c2ff95"
  },
  "variable": {
    "color": "hsl(207, 82%, 66%)"
  },
  "operator": {
    "color": "#58B8FF"
  },
  "function": {
    "color": "#58B8FF"
  },
  "url": {
    "color": "hsl(187, 47%, 55%)"
  },
  "attr-value > .token.punctuation.attr-equals": {
    "color": "hsl(220, 14%, 71%)"
  },
  "special-attr > .token.attr-value > .token.value.css": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-css .token.selector": {
    "color": "#FF6DFD"
  },
  ".language-css .token.property": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-css .token.function": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-css .token.url > .token.function": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-css .token.url > .token.string.url": {
    "color": "#c2ff95"
  },
  ".language-css .token.important": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-css .token.atrule .token.rule": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-javascript .token.operator": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation": {
    "color": "hsl(5, 48%, 51%)"
  },
  ".language-json .token.operator": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-json .token.null.keyword": {
    "color": "#ffd171"
  },
  ".language-markdown .token.url": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url > .token.operator": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url-reference.url > .token.string": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url > .token.content": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".language-markdown .token.url > .token.url": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-markdown .token.url-reference.url": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-markdown .token.blockquote.punctuation": {
    "color": "hsl(220, 10%, 40%)",
    "fontStyle": "italic"
  },
  ".language-markdown .token.hr.punctuation": {
    "color": "hsl(220, 10%, 40%)",
    "fontStyle": "italic"
  },
  ".language-markdown .token.code-snippet": {
    "color": "#c2ff95"
  },
  ".language-markdown .token.bold .token.content": {
    "color": "#ffd171"
  },
  ".language-markdown .token.italic .token.content": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-markdown .token.strike .token.content": {
    "color": "#FF6DFD"
  },
  ".language-markdown .token.strike .token.punctuation": {
    "color": "#FF6DFD"
  },
  ".language-markdown .token.list.punctuation": {
    "color": "#FF6DFD"
  },
  ".language-markdown .token.title.important > .token.punctuation": {
    "color": "#FF6DFD"
  },
  "bold": {
    "fontWeight": "bold"
  },
  "italic": {
    "fontStyle": "italic"
  },
  "namespace": {
    "Opacity": "0.8"
  },
  "token.tab:not(:empty):before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.cr:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.lf:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.space:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
    "marginRight": "0.4em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  ".line-highlight.line-highlight": {
    "background": "hsla(220, 100%, 80%, 0.04)"
  },
  ".line-highlight.line-highlight:before": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 14%, 71%)",
    "padding": "0.1em 0.6em",
    "borderRadius": "0.3em",
    "boxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.2)"
  },
  ".line-highlight.line-highlight[data-end]:after": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 14%, 71%)",
    "padding": "0.1em 0.6em",
    "borderRadius": "0.3em",
    "boxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.2)"
  },
  "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
    "backgroundColor": "hsla(220, 100%, 80%, 0.04)"
  },
  ".line-numbers.line-numbers .line-numbers-rows": {
    "borderRightColor": "hsla(220, 14%, 71%, 0.15)"
  },
  ".command-line .command-line-prompt": {
    "borderRightColor": "hsla(220, 14%, 71%, 0.15)"
  },
  ".line-numbers .line-numbers-rows > span:before": {
    "color": "hsl(220, 14%, 45%)"
  },
  ".command-line .command-line-prompt > span:before": {
    "color": "hsl(220, 14%, 45%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-1": {
    "color": "#FF6DFD"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-5": {
    "color": "#FF6DFD"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-9": {
    "color": "#FF6DFD"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-2": {
    "color": "#c2ff95"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-6": {
    "color": "#c2ff95"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-10": {
    "color": "#c2ff95"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-3": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-7": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-11": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-4": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-8": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-12": {
    "color": "hsl(286, 60%, 67%)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
    "backgroundColor": "hsla(353, 100%, 66%, 0.15)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
    "backgroundColor": "hsla(353, 100%, 66%, 0.15)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
    "backgroundColor": "hsla(137, 100%, 55%, 0.15)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
    "backgroundColor": "hsla(137, 100%, 55%, 0.15)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  ".prism-previewer.prism-previewer:before": {
    "borderColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-gradient.prism-previewer-gradient div": {
    "borderColor": "hsl(224, 13%, 17%)",
    "borderRadius": "0.3em"
  },
  ".prism-previewer-color.prism-previewer-color:before": {
    "borderRadius": "0.3em"
  },
  ".prism-previewer-easing.prism-previewer-easing:before": {
    "borderRadius": "0.3em"
  },
  ".prism-previewer.prism-previewer:after": {
    "borderTopColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-flipped.prism-previewer-flipped.after": {
    "borderBottomColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-angle.prism-previewer-angle:before": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-time.prism-previewer-time:before": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-easing.prism-previewer-easing": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-angle.prism-previewer-angle circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "strokeOpacity": "1"
  },
  ".prism-previewer-time.prism-previewer-time circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "strokeOpacity": "1"
  },
  ".prism-previewer-easing.prism-previewer-easing circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "fill": "transparent"
  },
  ".prism-previewer-easing.prism-previewer-easing path": {
    "stroke": "hsl(220, 14%, 71%)"
  },
  ".prism-previewer-easing.prism-previewer-easing line": {
    "stroke": "hsl(220, 14%, 71%)"
  }
};
