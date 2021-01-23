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

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        HomePageMeta: {
          homePageDescription,
          homePageHeaderPicture,
          homePageHeaderTitle,
          homePageFeaturedFilms
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          HomePageMeta {
            homePageDescription
            homePageHeaderTitle
            homePageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageFeaturedFilms {
              ... on WPGraphql_Film {
                slug
                FilmMeta {
                  description
                  director
                  name
                  year
                  picture {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 50, grayscale: true) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={homePageHeaderPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
        </div>
        <div className="films">
          <h2>Featured Films</h2>
          <div className="film-items">
            {homePageFeaturedFilms.map(({ FilmMeta, slug }) => (
                <Film to={`/${slug}`} key={slug}>
                <Image
                  fluid={FilmMeta.picture.imageFile.childImageSharp.fluid}
                  alt={FilmMeta.picture.altText}
                />
                <div className="film-info">
                  <p>
                    {FilmMeta.name}
                  </p>
                  <p>Director: {FilmMeta.director}</p>
                </div>
              </Film>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage