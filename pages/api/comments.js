// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//this is the custom api for comments graphql allow us to write our own backend

//this comments.js is an ENDPOINT for  '/api/comments'


import { GraphQLClient , gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;





export default async function comments(req, res) {

  

  const graphQLClient = new GraphQLClient((graphqlAPI),{
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  })

  //  mutation in GraphQl means we are updating or modifing some data
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });
  
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    // return res.status(500).send(error);

  }


}
