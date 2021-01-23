import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  Film,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const FilmsPage = () => {
    const {
        wpcontent: {
          page: {
            FilmsMeta: { filmsPageDescription, filmsPageHeaderPicture },
          },
          films: { edges: films },
        },
      } = useStaticQuery(graphql`
        query{
            wpcontent {
                page(id: "films", idType: URI) {
                    FilmsMeta {
                        filmsPageDescription
                        filmsPageHeaderPicture {
                            sourceUrl
                            imageFile {
                                childImageSharp {
                                fluid(quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        altText
                    }
                }
            }
            films {
                    edges {
                        node {
                        FilmMeta {
                            year
                            name
                            director
                            description
                            picture {
                                altText
                                    sourceUrl
                                    imageFile {
                                        childImageSharp {
                                        fluid(quality: 75, grayscale: true) {
                                            ...GatsbyImageSharpFluid_withWebp
                                        }
                                    }
                                }
                            }
                        }
                        slug
                     }
                 }
            }
        }
    }
`)
    return (
        <Layout>
        <SEO title="Films" />
        <Wrapper filmsColor={COLORS.BLACK} descriptionColor={COLORS.BLACK}>
          <div className="banner">
            <Image
              fluid={filmsPageHeaderPicture.imageFile.childImageSharp.fluid}
              alt={filmsPageHeaderPicture.altText}
            />
            <BottomEdgeDown color={COLORS.BLACK}/>
          </div>
          <div className="description">
            <h2>Ocbe Films</h2>
            <p>{filmsPageDescription}</p>
          </div>
          <div className="films" color="black">
            <h2>Our Films</h2>
            <div className="film-items">
              {films.map(({ node: { FilmMeta, slug } }) => (
                <Film to={`/${slug}`} key={slug}>
                  <Image
                    fluid={FilmMeta.picture.imageFile.childImageSharp.fluid}
                    alt={FilmMeta.picture.altText}
                  />
                  <div className="film-info">
                    <p>
                      {FilmMeta.name}
                    </p>
                  </div>
                </Film>
              ))}
            </div>
          </div>
        </Wrapper>
      </Layout>
    )
}

export default FilmsPage