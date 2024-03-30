import * as borsh from '@project-serum/borsh'

export class Vote {
    postId;
    VoteCount;
    userId;

    constructor(postId, VoteCount, userId) {
        this.postId = postId;
        this.VoteCount = VoteCount;
        this.userId = userId;
    }

    static mocks = [
        new Vote('121k', 5, `For a movie shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a movie that can teach you a lesson everytime you watch it. An all time Classic!!!`),
        new Vote('skfjsld', 2, `One of Hollywood's greatest critical and commercial successes, The Godfather gets everything right; not only did the movie transcend expectations, it established new benchmarks for American cinema.`),
  ]

    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('postId'),
        borsh.u8('VoteCount'),
        borsh.str('userId'),
    ])

    serialize(){
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }
}