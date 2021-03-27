import path from 'path';
import axios from 'axios';

const convertPizzasToPages = async ({ graphql, actions }) => {
  // 1. CREATE A TEMPLATE
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. QUERY ALL PIZZAS
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. LOOP OVER EACH PIZZA AND CREATE A PAGE FOR THAT PIZZA
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // Url for the new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // use context to pass data to component, prop name will be pageContext
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const createPizzaListByTopping = async ({ graphql, actions }) => {
  const {
    data: { allToppings },
  } = await graphql(`
    query {
      allToppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  allToppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: path.resolve('./src/pages/pizza.js'),
      context: {
        name: topping.name,
        nameRegEx: `/${topping.name}/i`,
      },
    });
  });
};

async function fetchBeersAndConvertToNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const allBeers = (await axios.get('https://api.sampleapis.com/beers/ale'))
    .data;

  for (const beer of allBeers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // create new node for beer inside gql later layer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

const convertSlicemastersIntoPages = async ({ actions, graphql }) => {
  // 1. Query all masters
  const {
    data: { slicemasters },
  } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Turn each slicemasters into their own page
  slicemasters.nodes.forEach((master) => {
    actions.createPage({
      path: `/slicemasters/${master.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: master.slug.current,
      },
    });
  });
  // 3. Computer number of pages based on amount of masters and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE); // returns a string which we have to convert to a number
  const pageCount = Math.ceil(slicemasters.totalCount / pageSize);
  // 4. Loop from 1 to n (number of pages) and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // context is passed to the page/template upon creation under pageContext prop;
      // context can also be accessed inside graphql page query as a variable(i.e. query($skip)).
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

// Sourcing Nodes - putting the data into gatsby api, nodes being a piece of data
export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndConvertToNodes(params)]);
};

export const createPages = async (params) => {
  // CREATE PAGES DYNAMICALLY
  // await for all Promises to be resolved before finishing this function
  await Promise.all([
    convertPizzasToPages(params),
    createPizzaListByTopping(params),
    convertSlicemastersIntoPages(params),
  ]);
  // 1. PIZZAS
  // 2. TOPPINGS
  // 3. SLICEMASTERS
};
