import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/filmStyles"

const FilmTemplate = ({data: {
    wpcontent: {
      film: {
        FilmMeta,
        genres: { edges: genres },
      },
    },
  },
}) => {

  return (
    <Layout>
      <SEO title="Film" />
      <Wrapper>
        <div className="film-container">
          <div className="film-image">
            <Image
              fluid={FilmMeta.picture.imageFile.childImageSharp.fluid}
              alt={FilmMeta.picture.altText}
            />
          </div>
          <div className="film-info">
            <h2>
              {FilmMeta.name}
            </h2>
            <p className="description">{FilmMeta.description}</p>

            {genres.map(({ node: genre }) => (
            <p key={genre.name} className="info">
                <strong>Genres: </strong> {genre.name}
            </p>
            ))}
            
            <p className="info">
              <strong>Director: </strong> {FilmMeta.director}
            </p>
            <p className="info">
              <strong>Year: </strong> {FilmMeta.year}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default FilmTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      film(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        FilmMeta {
        description
        director
        name
        year
        picture {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
        id
      }
    }
  }
`