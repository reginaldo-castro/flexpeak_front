<template>
    <section class="json-container bg-light">
        <div class="container">
            <div class="row mb-2">
                <div class="col">
                    <button type="button" class="btn btn-primary float-end mt-4" @click="openModal('CadIngrediente')">+ Ingredientes</button>
                </div>
            </div>

            <div v-bind:class="['alert',  message.class]" role="alert" v-if="message.mensagem !== ''">
                {{message.mensagem}}
            </div>

            <div class="row mb-2">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Ingrediente</th>
                                <th>Quantidade</th>
                                <th colspan="2">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="estoque of estoques" :key="estoque.id">
                                <td>{{estoque.id}}</td>
                                <td>{{estoque.descricao }}</td>
                                <td>{{estoque.quantidade_ml}}</td>
                                 <td class="acao" @click="openEstoque(estoque)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </td>
                                <td class="acao" @click="openDeleteModal(ingrediente)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>


    <div class="modal fade" id="CadIngrediente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="CadIngrediente">
        <div class="modal-dialog">
            <div class="modal-content">
            <form @submit.prevent="actionForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{titleModalForm}}</h5>
                    <button type="button" class="btn-close" @click="hideModal('CadIngrediente')" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                      <p>
                        <input placeholder="Descrição do ingrediente" type="text" name="descricao" class="form-control" required v-model="estoque.descricao"/>
                    </p>

                    <p>
                        <input placeholder="Quantidade desejada" type="number" name="name" v-model="estoque.quantidade_ml" class="form-control" required/>
                    </p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal('CadIngrediente')">Close</button>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteIngrediente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="deleteIngrediente">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Deletar Ingrediente</h5>
                    <button type="button" class="btn-close" @click="hideModal('deleteIngrediente')" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Tem certeza que deseja deletar o ingrediente <strong>{{estoque.descricao}}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal('deleteIngrediente')">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="deleteIngrediente">Continuar</button>
                </div>
            </div>
        </div>
    </div>
            
</template>


<script>
    
    import Estoque from '../services/estoque'

    export default {

        data() {
            return {
                estoques: [],
                estoque: {
                    'id': '',
                    'descricao': '',
                    'quantidade_ml': '',
                },
                titleModalForm: String,
                message: {
                    'class': '',
                    'mensagem': ''
                }
            }
        },

        mounted() {
            this.getAllIngredientes()
            this.titleModalForm = 'Criar novo Ingredientes'
        },

        methods:{
            async getAllIngredientes() {
                Estoque.getAllIngredientes().then(res => {
                    this.estoques = res.data
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            async actionForm(){
                
                if(this.estoque.id) {
                    await this.updateIngrediente();
                } else {
                    await this.createIngrediente()
                }
                await this.hideModal('CadIngrediente')
                await this.getAllIngredientes()
            },

            async createIngrediente(){
                await Estoque.createIngrediente(this.estoque).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Ingrediente criado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            async updateIngrediente() {
                var data = {
                    id: this.estoque.id,
                    descricao: this.estoque.descricao,
                    quantidade_ml: this.estoque.quantidade_ml
                };
                
                await Estoques.updateIngrediente(this.estoque.id, data).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Ingrediente recriado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            async deleteIngrediente() {
                await Estoque.deleteIngrediente(this.estoque.id).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Ingrediente deletado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
                this.estoque = {}
                await this.hideModal('deleteIngrediente')
            },

           async hideModal(idModal) {
                this.estoque = {}
                await this.getAllIngredientes()
                $(`#${idModal}`).modal('hide')
            },

            openModal(idModal) {
                $(`#${idModal}`).modal('show')
            },

            openEstoque(estoque) {
                this.estoque = estoque
                this.titleModalForm = 'Editar ingrediente'
                this.openModal('CadIngrediente')
            },

            openDeleteModal(estoque) {
                this.estoque = estoque
                this.openModal('deleteIngrediente')
            }
    }   
}
</script>

<style>
.acao {
    cursor: pointer;
}
</style>