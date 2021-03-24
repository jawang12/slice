import path from 'path';

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

export const createPages = async (params) => {
  // CREATE PAGES DYNAMICALLY
  // 1. PIZZAS
  await convertPizzasToPages(params);
  // 2. TOPPINGS
  // 3. SLICEMASTERS
};
