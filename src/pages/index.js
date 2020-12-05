import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Film,
} from "../pages/pageStyles/pageStyles"
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
                id
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
                console.log(homePageFeaturedFilms)

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
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="films">
          <h2>Featured Films</h2>
          <div className="film-items">
            {homePageFeaturedFilms.map(({ FilmMeta, slug }) => (
                <Film key={slug} to={`/${slug}`}>
                <Image
                  fluid={FilmMeta.picture.imageFile.childImageSharp.fluid}
                  alt={FilmMeta.picture.altText}
                />
                <div className="film-info">
                  <p>
                    {FilmMeta.name}
                  </p>
                  <p>{FilmMeta.description}</p>
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