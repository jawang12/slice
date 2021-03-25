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

export const createPages = async (params) => {
  // CREATE PAGES DYNAMICALLY
  // await for all Promises to be resolved before finishing this function
  await Promise.all([
    convertPizzasToPages(params),
    createPizzaListByTopping(params),
  ]);
  // 1. PIZZAS
  // 2. TOPPINGS
  // 3. SLICEMASTERS
};
