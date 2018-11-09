import englishMessages from 'ra-language-english';

export default {
    ...englishMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            cardapio: 'Menu',
            cardapio_tradicional: 'Regular',
            cardapio_especial: 'Premium',
            cardapio_doce: 'Sweet',
            monthly_revenue: 'Monthly Revenue',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            new_customers: 'New Customers',
            pending_orders: 'Pending Orders',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to Pizzaibot admin',
                subtitle:
                    "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                aor_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
        login: {
            connect: "Connect Facebook Account",
            sign_in: "Sign In with Facebook to create your first bot",
            agree_terms_of_service: 'I agree to PizzaIBot Terms of Service and Privacy Police',
            agree_next: "What's coming next?",
            agree_description: "We'll need some permissions to manage your Page's messages to automate your replies. That will open Facebook but don't worry! You will be back right after granting all requested permissions."
        },
        pageList: {
            facebook_pages: "Facebook Pages",
            select_facebook_page: "Select the facebook page to be connected to the bot",
            back: "Back",
            confirm: "Confirm",
        }
    },
    resources: {
        stores: {
            name: 'Store |||| Stores',
            fields: {
                open: 'Open',
                close: 'Close',
                sunday: 'Sunday',
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                saturday: 'Saturday',
                holyday: 'Holyday',
            },
            tabs: {
                main: 'Main',
                openingtimes: 'Opening Times',
            },
            page: {
                delete: 'Delete Customer',
            },
        },
        flavors: {
            name: 'Flavor |||| Flavors',
            fields: {
                flavor: 'Flavor',
                kind: 'Kind',
                toppings: 'Toppings',
            },
        },
        pageslist: {
            name: 'Active Page |||| Active Pages',
            fields: {
                name: 'Nome',
                greetingText: 'Saudação do Facebook',
                firstResponseText: 'Primeira resposta após iniciar',
            }

        },
    },
};
