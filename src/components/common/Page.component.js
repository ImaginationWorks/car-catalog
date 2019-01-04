import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';


const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';

const defaultTitle = 'Car Catalog';
const defaultDescription = 'A simple car catalog app.';
const defaultImage = 'https://www.abc.es/media/motor/2016/10/20/LynkCo1-k5hD--620x349@abc.jpg';

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags
    },
    pathname
  ) {
    const theTitle = title || defaultTitle;
    const theDescription = description || defaultDescription;
    const theImage = image ? `${SITE_URL}${image}` : defaultImage;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:image', content: theImage },
      { property: 'og:description', content: theDescription },
      { property: 'og:site_name', content: defaultTitle }
    ];

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  }

  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
          }}
          title={
            rest.title ? rest.title + defaultTitle : defaultTitle
          }
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname
            }
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        {children}
      </div>
    );
  }
}

export default withRouter(Page);
