import portugueseMessages from 'ra-language-portuguese';

export default {
    ...portugueseMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        auth: {
            invalid_token: 'Token de acesso inválido, por favor, faça o login novamente',
            no_token: 'Não foi gerado um token de acesso válido, por favor, faça o login novamente',
            login_facebook: 'Favor realizar login novamente, sua conta no Facebook precisa estar conectada.',
            no_user: 'Usuário inexistente no sistema.'
        },
        dashboard: {
            cardapio: 'Cardápio',
            cardapio_tradicional: 'Tradicionais',
            cardapio_especial: 'Especiais',
            cardapio_doce: 'Doces',
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
                title: 'Bem-vindo a administração do Pizzaibot',
                subtitle:
                    "Aqui você poderá administrar as opções que serão oferecidas aos seus clientes quando eles entrarem em contato com a sua empresa através do seu chatbot.",
                aor_button: 'Site do pizzaibot',
                demo_button: 'Source for this demo',
            },
        },
        login: {
            connect: "Conecte sua conta Facebook",
            sign_in: "Entre com o Facebook para criar o seu bot",
            agree_terms_of_service_ini: "Eu concordo com os ",
            agree_terms_of_service_end: "Termos de Serviço e Política de Privacidade do PizzaAIBot",
            agree_next: "O que acontece depois?",
            agree_description: "Nós vamos precisar de algumas permissões para gerenciar a sua Página e automatizar as suas respostas. Agora você será direcionado para o Facebook, mas não se preocupe! Você estará de volta ao nosso site assim que as permissões solicitadas forem concedidas.",
            continue_with_facebook: "Continuar com Facebook"
        },
        pageList: {
            facebook_pages: "Páginas do Facebook",
            select_facebook_page: "Selecione a página que será conectada ao bot",
            back: "Voltar",
            confirm: "Confirmar",
        }
    },
    resources: {
        flavors: {
            name: 'Sabor |||| Sabores',
            fields: {
                flavor: 'Sabor',
                kind: 'Tipo',
                toppings: 'Ingredientes',
            },
        },
        toppings: {
            name: 'Ingrediente |||| Ingredientes',
            fields: {
                topping: 'Ingrediente',
                toppings: 'Ingredientes',
            },
        },
        pricings: {
            name: 'Preço |||| Preços',
            fields: {
                kind: 'Tipo',
                size: 'Tamanho',
                price: 'Preço',
            },
        },
        beverages: {
            name: 'Bebida |||| Bebidas',
            fields: {
                kind: 'Tipo',
                name: 'Descrição',
                price: 'Preço',
            },
        },
        stores: {
            name: 'Loja |||| Lojas',
            fields: {
                name: 'Nome',
                address: 'Endereço',
                city: 'Cidade',
                state: 'Estado',
                phone: 'Telefone',
                open: 'Abre',
                close: 'Fecha',
                sunday: 'Domingo',
                monday: 'Segunda-feira',
                tuesday: 'Terça-feira',
                wednesday: 'Quarta-feira',
                thursday: 'Quinta-feira',
                friday: 'Sexta-feira',
                saturday: 'Sábado',
                holyday: 'Feriados',
            },
            tabs: {
                main: 'Principal',
                openingtimes: 'Horários de Abertura',
            },
        },
        pages: {
            name: 'Página |||| Páginas',
            fields: {
                name: 'Nome',
                greetingText: 'Saudação do Facebook',
                firstResponseText: 'Primeira resposta do bot ($NAME = será substituído pelo nome do cliente)',
            }

        },
        pageslist: {
            name: 'Página Ativa |||| Páginas Ativas',
            fields: {
                name: 'Nome',
                greetingText: 'Saudação do Facebook',
                firstResponseText: 'Primeira resposta após iniciar',
            }
        },
        sizes: {
            name: 'Tamanho |||| Tamanhos',
            fields: {
                size: 'Tamanho',
                split: 'Divide',
                slices: 'Nro de fatias',
            }

        },
    },
};
