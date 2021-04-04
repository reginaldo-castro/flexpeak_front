<template>
    <section class="json-container bg-light">
        <div class="container">
            <div class="row mb-2">
                <div class="col">
                    <button type="button" class="btn btn-primary float-end mt-4" @click="openModal('CadProducao')">+ Produzir</button>
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
                                <th>Descricao</th>
                                <th>Quantidade</th>
                                <th>Água</th>
                                <th>Álcool</th>
                                <th>Fragrâcia</th>
                                <th>Fragrância escolhida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="producao of producoes" :key="producao.id">
                                <td>{{producao.id}}</td>
                                <td>{{producao.descricao}}</td>
                                <td>{{producao.qtd_produzida}}</td>
                                <td>{{producao.agua_qtd}}</td>
                                <td>{{producao.alcool_qtd}}</td>
                                <td>{{producao.fragrancia_qtd}}</td>
                                <td>{{producao.id_fragrancia}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>


    <div class="modal fade" id="CadProducao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="CadProducao">
        <div class="modal-dialog">
            <div class="modal-content">
            <form @submit.prevent="actionForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{titleModalForm}}</h5>
                    <button type="button" class="btn-close" @click="hideModal('CadProducao')" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <p>
                        <input placeholder="Informe o nome do perfume" type="text" name="descricao" v-model="producao.descricao" class="form-control" required/>
                    </p>

                    <p>
                        <input placeholder="Quantidade desejada" type="number" name="name" v-model="producao.qtd_produzida" class="form-control" required/>
                    </p>

                    <p>
                        <input placeholder="Agua " type="number" name="name" v-model="producao.agua_qtd" class="form-control" required/>
                    </p>

                    <p>
                        <input placeholder="Alcool " type="number" name="name" v-model="producao.alcool_qtd" class="form-control" required/>
                    </p>

                    <p>
                        <input placeholder="Fragrancia " type="number" name="name" v-model="producao.fragrancia_qtd" class="form-control" required/>
                    </p>
                                        
                    <p>
                    <select v-model="producao.id_fragrancia">
                        <option v-for="estoque in estoques" :key="estoque.id" :value="estoque.id">
                            {{ estoque.descricao }}
                        </option>
                    </select>
                    </p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal('CadProducao')">Close</button>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </form>
            </div>
        </div>
    </div>

             
</template>

<script>
    
    import Producao from '../services/producao'
    //import Perfume from '../services/perfumes'
    import Estoque from '../services/estoque'

    export default {

        data() {
            return {
                producoes: [],
                producao: {
                    'id': '',
                    'descricao': '',
                    'qtd_produzida': '',
                    'agua_qtd': '',
                    'alcool_qtd': '',
                    'fragrancia_qtd': '',
                    'id_fragrancia': ''
                },
                titleModalForm: String,
                message: {
                    'class': '',
                    'mensagem': ''
                }
            }
        },

        mounted() {
            this.getAllProducao()
            this.titleModalForm = 'Produzir'
        },

        methods:{
            async getAllProducao() {
                Producao.getAllProducao().then(res => {
                    this.producoes = res.data
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

             /*async getAllPerfumes() {
                Perfume.getAllPerfumes().then(res => {
                    this.perfumes = res.data
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },*/

            async getAllIngredientes() {
                Estoque.getAllIngredientes().then(res => {
                    this.ingredientes = res.data
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            async actionForm(){
                
                if(this.producao.id) {
                    //await this.updatePerfume();
                } else {
                    await this.createProducao()
                    
                }
                await this.hideModal('CadProducao')
                await this.getAllProducao()
                
            },

            async createProducao(){
                await Producao.createProducao(this.producao).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Perfume criado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            /*async updatePerfume() {
                //var data = {
                    //id: this.perfume.id,
                    //descricao: this.perfume.descricao,
                    //quantidade_ml: this.perfume.quantidade_ml
                //};
                
                await Perfumes.updatePerfume(this.perfume.id, data).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Perfume recriado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
            },

            async deletePerfume() {
                await Perfumes.deletePerfume(this.perfume.id).then(res => {
                    this.message.class = 'alert-success'
                    this.message.mensagem = 'Perfume deletado com sucesso!'
                }, (error) => {
                    this.message.class = 'alert-danger'
                    this.message.mensagem = 'Erro de conectar com o servidor, por favor tente mais tarde!'
                })
                this.perfume = {}
                await this.hideModal('deletePerfume')
            },*/

           async hideModal(idModal) {
                this.producoes = {}
                await this.getAllProducao()
                $(`#${idModal}`).modal('hide')
            },

            openModal(idModal) {
                this.producoes = {}
                //this.getAllPerfumes()
                this.getAllIngredientes()
                $(`#${idModal}`).modal('show')
                
            },
        /*
            openProducao(producao) {
                this.producao = producao
                this.titleModalForm = 'Editar producao'
                this.openModal('CadProducao')
            },

            openDeleteModal(perfume) {
                this.perfume = perfume
                this.openModal('deletePerfume')
            }*/
        }
    }   

</script>

<style>
.acao {
    cursor: pointer;
}
</style>