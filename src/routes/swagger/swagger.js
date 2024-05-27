export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MATC84-LABORATORIO-DE-PROGRAMACAO-WEB",
      description: "Projeto MATC84",
      version: "1.0.0",
    },
    servers: [
      {
        url: "{protocol}://{host}",
        description: "Servidor Dinâmico",
        variables: {
          protocol: {
            default: "http",
            enum: ["http", "https"]
          },
          host: {
            default: "localhost:3000"
          }
        }
      },
      {
        url: "https://back.matc84.tauane.artadevs.tech",
        description: "Servidor Vercel (Produção)",
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Cria um novo usuário",
          description: "Cria um novo usuário",
          operationId: "createUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                examples: {
                  user: {
                    summary: "Exemplo de usuário",
                    value: {
                      name: "usuario",
                      email: "email@example.com",
                      password: "exemplo123",
                      city: "Salvador",
                      state: "Bahia",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      "/auth/check-mail": {
        post: {
          summary: "Verifica email",
          description:
            "Verifica se o email digitado existe no banco de dados, se sim, envia um token para o email do usuário",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                  },
                  required: ["email"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de email",
                    value: {
                      email: "email@example.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Token enviado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/auth/verify-token/{token}": {
        get: {
          summary: "Verifica token",
          description: "Verifica se o token digitado é válido",
          parameters: [
            {
              name: "token",
              in: "path",
              description: "Token do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Token válido!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            404: {
              description: "Token expirado ou inválido!",
            },
          },
        },
      },
      "/auth/modify-password": {
        post: {
          summary: "Alteração de senha do usuário",
          description: "Altera a senha do usuário",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                    newPassword: {
                      type: "string",
                      description: "Nova senha do usuário",
                    }
                  },
                  required: ["email", "newPassword", "token"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de modificação de senha",
                    value: {
                      email: "email@example.com",
                      newPassword: "Password1*"
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Senha alterada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PasswordChangeResponse",
                  },
                },
              },
            },
            400: {
              description: "Dados inválidos",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/user/{id}": {
        get: {
          summary: "Busca um usuário pelo ID",
          description: "Busca um usuário pelo ID",
          operationId: "getUserById",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Usuário encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        }},
        "/user/": {
        delete: {
          summary: "Deleta um usuário pelo token",
          description: "Deleta um usuário pelo token",
          operationId: "deleteUserByToken",
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            200: {
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
        patch: {
          summary: "Atualiza um usuário pelo token",
          description: "Atualiza os dados de um usuário pelo token, exceto o email",
          operationId: "updateLoggedUser",
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                    city: {
                      type: "string",
                      description: "Cidade",
                    },
                    state: {
                      type: "string",
                      description: "Estado",
                    },
                  },
                  required: ["name", "password", "city", "state"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de atualização de usuário",
                    value: {
                      name: "novoNome",
                      password: "novaSenha123",
                      city: "Aracaju",
                      state: "Sergipe",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário atualizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "user/me": {
       get: {
          summary: "Busca dados do usuário autenticado",
          description: "Retorna os dados do usuário autenticado usando Bearer Token",
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            200: {
              description: "Dados do usuário",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            401: {
              description: "Token não fornecido ou inválido",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/admin/users/": {
        get: {
          summary: "Busca todos os usuários (admin)",
          description: "Retorna uma lista de todos os usuários para administração",
          operationId: "findAllUsers",
          responses: {
            200: {
              description: "Lista de usuários",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/admin/user/{id}": {
        delete: {
          summary: "Deleta um usuário pelo ID (admin)",
          description: "O administrador deleta qualquer usuário passando o ID",
          operationId: "deleteUserByIdAdmin",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do usuário a ser deletado",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "Token do administrador",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login de usuário",
          description: "Autentica um usuário com email e senha",
          operationId: "loginUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                  },
                  required: ["email", "password"],
                },
                examples: {
                  credentials: {
                    summary: "Exemplo de credenciais",
                    value: {
                      email: "email@example.com",
                      password: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login bem-sucedido",
              headers: {
                Authorization: {
                  description: "Token de autenticação JWT",
                  schema: {
                    type: "string",
                  },
                },
              },
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              description: "Email do usuário",
            },
            password: {
              type: "string",
              description: "Senha do usuário",
            },
            city: {
              type: "string",
              description: "Cidade do usuário",
            },
            state: {
              type: "string",
              description: "Estado do usuário",
            },
          },
          required: ["name", "email", "password"],
        },
        TokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Token de autenticação",
            },
          },
        },
        PasswordChangeResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de confirmação de alteração de senha",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};
