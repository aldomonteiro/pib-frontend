import portugueseMessages from 'ra-language-portuguese';

export default {
    ...portugueseMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        areYouSure: 'Você tem certeza disso?',
        deleting: 'Apagando ',
        messages: {
            duplicatedKey: 'Ops, já há um registro com esse ID, favor utizar outro ID.'
        },
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
        categories: {
            changeCategory: 'Alterar Categorias em Massa',
        },
        customer: {
            messages: {
                no_customer_found: "Cliente não foi encontrado."
            }
        },
        dashboard: {
            cardapio: 'Cardápio',
            cardapio_tradicional: 'Tradicionais',
            cardapio_especial: 'Especiais',
            cardapio_doce: 'Doces',
            new_orders: 'Novos Pedidos',
            new_customers: 'Novos Clientes',
            pending_orders: 'Pedidos pendentes',
            order: {
                items:
                    'por %{customer_name}, um item |||| por %{customer_name}, %{nb_items} itens',
            },
            welcome: {
                title: 'Bem-vindo a administração do Pizzaibot',
                subtitle:
                    "Aqui você poderá administrar as opções que serão oferecidas aos seus clientes quando eles entrarem em contato com a sua empresa através do seu chatbot.",
                aor_button: 'Site do pizzaibot',
                demo_button: 'Source for this demo',
            },
            chart: {
                title: 'Comparativo Semanal',
                pw: 'Semana Passada',
                tw: 'Semana Atual'
            },
            stats: {
                monthly_revenue: 'Receita mensal',
                weekly_revenue: 'Receita semanal',
                monthly_orders: 'Pedidos mês',
                weekly_orders: 'Pedidos semana',
                monthly_pizzas: 'Pizzas mês',
                weekly_pizzas: 'Pizzas semana'
            }
        },
        dataload: {
            catalog: 'Carga do Cardápio',
        },
        flavors: {
            changePrice: 'Alterar Preços em Massa',
            clone: 'Clonar',
            typePrice: 'Informe o novo preço',
            messages: {
                priceNotAllowed: 'Náo informe preço nesse produto, pois a categoria informada possui preço.'
            }
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
        menu: {
            catalog: 'Cardápio',
            orders: 'Pedidos',
            reports: 'Relatórios',
            admin: 'Administração',
            pizza: 'Pizzas'
        },
        notifications: {
            newNotifications: 'Avisos',
            talk_to_human: 'Falar com atendente',
            clear: 'Limpar notificação'
        },
        orders: {
            todayOrders: "Pedidos de hoje",
            rejecting: "Rejeitando o pedido",
            map: "Ver no mapa",
            report: "Lista de Pedidos",
            print: "Imprimir",
            accept: "Aceitar o pedido",
            reject: "Rejeitar o pedido",
            deliver: "Enviar pedido para entrega",
            defaultRejectionReason: "Infelizmente seu endereço está fora da nossa área de atendimento.",
            missingAddress: "Solicitar endereço",
            send: "Enviar Dúvida",
            typeQuestion: "Digite o que será enviado ao cliente",
            openQuestion: "Enviar pergunta",
            defaultQuestion: 'Quer algo para beber?',
            updateOrder: 'Atualizar o pedido',
            confirmAddress: "Confirme o endereço desse pedido",
            confirmTotal: "Confirme o valor total desse pedido",
            total: "Total do Pedido",
            status: {
                pending: "Pendente",
                viewed: "Aguard. Análise",
                confirmed: "Aguard. Análise",
                accepted: "Aceito - Pend.",
                printed: "Impresso",
                delivered: "Entregue",
                finished: "Finalizado",
                rejected: "Rejeitado",
                cancelled: "Cancelled"
            },
            new: {
                title: "Novo Pedido",
                chooseSize: "Tamanho",
                chooseFlavor: "Produto",
                chooseBeverage: "Bebida",
            },
            deliveryTime: 'Tempo de Entrega',
            pickupTime: 'Tempo de Reirada',
            selectAnOrder: 'Selecione um pedido na lista de pedidos',
            newOrder: 'Novo Pedido',
            newComment: 'Novo Comentário',
            newOrders: 'Novos Pedidos',
            messages: {
                invalidTotal: 'O valor informado é inválido. Informe um valor válido.',
            }
        },
        ordersmap: {
            title: "Pedidos no mapa",
        },
        pageList: {
            facebook_pages: "Páginas do Facebook",
            select_facebook_page: "Selecione a página que será conectada ao bot",
            back: "Voltar",
            confirm: "Confirmar",
            updatePageSuccess: 'Página atualizada com sucesso!',
        },
        stores: {
            updateDeliveryTimeSuccess: 'Tempo de entrega atualizado com sucesso!',
            updatePickupTimeSuccess: 'Tempo de retirada atualizado com sucesso!',
            messages: {
                whatsapp: 'Informe o número que será conectado ao Whatsapp'
            }
        },
        pages: {
            select: 'Selecionar',
        },
        configuration: {
            title: 'Dados Financeiros',
            creditCardHeader: 'Informe o número do seu Cartão de Crédito',
            paymentMethod: 'Forma de Pagamento',
            creditCard: 'Número do Cartão',
            creditCardName: 'Nome Impresso no Cartão',
            dueDate: 'Válido até',
            cvc: 'Cód.',
            updateSuccess: 'Dados financeiros atualizados com sucesso!',
            updateFailues: 'Houve um erro durante a atualização dos seus dados financeiros',
            messages: {
                invalidCreditCard: 'O número de cartão de crédito informado é inválido'
            }
        },
    },
    resources: {
        flavors: {
            name: 'Produto |||| Produtos',
            fields: {
                flavor: 'Produto',
                categoryId: 'Categoria',
                toppings: 'Ingredientes',
                price: 'Preço',
                price_by_size: 'Preço por Tamanho?',
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
                categoryId: 'Categoria',
                sizeId: 'Tamanho',
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
                phone_whatsapp: 'Telefone/Whatsapp',
                delivery_fee: 'Taxa de Entrega',
                delivery_fees: 'Taxas de Entrega',
                delivery_fees_from: 'Km - De',
                delivery_fees_to: 'Km - Até',
                delivery_fees_fee: 'Taxa',
                location_lat: 'Latitude',
                location_long: 'Longitude',
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
                printer: 'Impressora',
                catalog_url1: 'URL do Cardápio 1',
                catalog_url2: 'URL do Cardápio 2',
                payment_types: 'Formas de Pagamento',
                payment_types_type: 'Forma de Pagamento',
                payment_types_surcharge_percent: 'Acréscimo %',
                payment_types_surcharge_amount: 'Acréscimo Fixo',
                missing_address_notification: "Mensagem 'Solicitar Endereço'",
                accept_notification: "Mensagem 'Aceite do Pedido'",
                deliver_notification: "Mensagem 'Pedido saiu para entrega'"
            },
            tabs: {
                main: 'Principal',
                openingtimes: 'Horários de Abertura',
                location: 'Localização',
                customizing: 'Configurações',
                deliveryFees: 'Taxas de Entrega'
            },
        },
        pages: {
            name: 'Bot |||| Bots',
            fields: {
                name: 'Nome',
                greetingText: 'Saudação do Facebook',
                firstResponseText: 'Primeira resposta do bot ($NAME = será substituído pelo nome do cliente)',
                orderExample: 'Exemplo dos dados que precisam ser enviados para um pedido rápido. ($TEMPOENTREGAR e $TEMPORETIRAR são variaveis)',
                activeBot: 'Bot ativo?',
            },
            actions: {
                activate: 'Ativar o Bot',
                deactivate: 'Apenas Desativar o Bot',
                deactivateAndDelete: 'Desativar & Apagar tudo',
            },
            messages: {
                warningBeforeDelete: 'Você tem certeza que quer excluir/desativar o Bot? Todos os dados associados serão excluídos. Não é possível desfazer.',
                successfullDeactivated: 'Bot desativado com sucesso.',
            }
        },
        pageslist: {
            name: 'Minha Página |||| Minhas Páginas',
            fields: {
                name: 'Nome',
                greetingText: 'Saudação do Facebook',
                firstResponseText: 'Primeira resposta após iniciar',
            }
        },
        customers: {
            name: 'Cliente |||| Clientes',
            tabs: {
                identity: 'Identificação',
                address: 'Endereço',
                orders: 'Pedidos',
                stats: 'Estatísticas',
            },
            fields: {
                customer: 'Cliente',
                first_name: 'Primeiro Nome',
                last_name: 'Último Nome',
                createdAt: 'Data Criação',
                updatedAt: 'Data Atualização',
                phone: 'Telefone',
                order: 'Pedido',
                orders: 'Pedidos',
                addr_formatted: 'Endereço completo',
                addr_postalcode: 'CEP',
                addr_city: 'Cidade',
                first_order: 'Primeiro Pedido',
                last_order: 'Últims Pedido',
                nb_orders: 'Número de Pedidos',
                total_spent: 'Total Gasto',
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
        categories: {
            name: 'Categoria |||| Categorias',
            fields: {
                category: 'Categoria',
                name: 'Categoria',
                price_by_size: 'Preço por tamanho?',
                is_pizza: 'É pizza?',
            },
        },
        orders: {
            name: "Pedido |||| Pedidos",
            fields: {
                id: 'ID',
                customer: 'Cliente',
                customerId: 'Cliente',
                status2: 'Status',
                createdAt: 'Data Criação',
                updatedAt: 'Data Atualização',
                phone: 'Telefone',
                address: 'Endereço',
                distanceFromStore: 'Distância',
                payment_type: 'Forma de Pagamento',
                delivery_type: 'Entrega/Retira',
                payment_change: 'Levar Troco?',
                comments: 'Dados do Pedido',
                confirmed_at: 'Data pedido',
                confirmed_at_rangestart: 'Início',
                confirmed_at_rangeend: 'Fim',
                delivery_fee: 'Taxa de Entrega',
                surcharge_percent: '% Forma de Pagto.',
                surcharge_amount: 'Acréscimo Forma de Pagto.',
                total: "Total",
                basket: {
                    reference: "Referência",
                    unit_price: "Preço Unit.",
                    quantity: "Qtde.",
                    sum: "Soma",
                    total: "Total",
                },
            },
            messages: {
                warningBeforeReject: "Ao executar essa ação, o cliente receberá um aviso que o pedido não será atendido. Por favor informe o motivo que será enviado ao cliente.",
                successfulAcceptedOrder: "Pedido aceito com sucesso.",
                successfulPrintedOrder: "Pedido impresso com sucesso.",
                successfullRejectedOrder: "Pedido rejeitado.",
                errorViewing: 'Houve um erro ao tentar atualizar a base de dados, tente novamente.',
                success: {
                    notifyCustomer: "Aviso enviado com sucesso",
                    deliveredOrder: "Pedido atualizado como entregue com sucesso.",
                    updatedOrder: "Pedido atualizado com sucesso.",
                },
                failure: {
                    notifyCustomer: "Erro ao enviar aviso. Envie manualmente pelo Whatsapp.",
                    deliveredOrder: "Erro ao atualizar o status do pedido. Tente novamente por favor",
                    updatedOrder: "Erro ao atualizar o pedido. Tente novamente por favor",
                }
            }
        },
        reportOrders: {
            name: "Pedido |||| Pedidos",
            fields: {
                id: 'ID',
                customer: 'Cliente',
                customerId: 'Cliente',
                status2: 'Status',
                createdAt: 'Data Criação',
                updatedAt: 'Data Atualização',
                phone: 'Telefone',
                address: 'Endereço',
                distanceFromStore: 'Distância',
                payment_type: 'Forma de Pagamento',
                delivery_type: 'Entrega/Retira',
                payment_change: 'Levar Troco?',
                comments: 'Observações',
                confirmed_at: 'Data pedido',
                confirmed_at_rangestart: 'Início',
                confirmed_at_rangeend: 'Fim',
                basket: {
                    reference: "Referência",
                    unit_price: "Preço Unit.",
                    quantity: "Qtde.",
                    sum: "Soma",
                    total: "Total",
                },
            },
        },
        reportFlavors: {
            name: "Produto |||| Produtos",
            fields: {
                id: 'ID',
                flavor: 'Produto',
                confirmed_at_rangestart: 'Início',
                confirmed_at_rangeend: 'Fim',
                categoryId: 'Categoria',
                amountSold: 'Total Vendido',
                itemsSold: 'Itens Vendidos',
                firstSale: 'Primeiro Pedido',
                lastSale: 'Último Pedido',
            },
        }
    },
};
