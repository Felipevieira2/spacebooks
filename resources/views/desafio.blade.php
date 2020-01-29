@extends('layouts.app')

@section('content')


<div class="container">

    <div class="row justify-content-center">
        <div class="col-md-12">
        
            <div class="card">
                <div class="card-header">Matando o monstro</div>

                <div class="card-body">
                    <div class="row text-center mb-3">
                        <div class="col-md-6 ">Jogador</div>
                        <div class="col-md-6 ">Monstro</div>
                    </div>
                    <div class="row  justify-content-center text-center">
                        <div class="col-md-5 bg-success">@{{ player.life }}</div>                        
                        <div class="col-md-1"></div>  
                        <div class="col-md-5 bg-success">@{{ monster.life }}</div>
                    </div>
                
                </div>
            </div>
            <hr>
            <div class="card">
                <div class="card-header">Matando o monstro</div>

                <div class="card-body">                   
                    <button @click="basic_attack()" >Atacar</button>
                    <button @click="special_attack()">Ataque Especial</button>
                    <button @click="getCura()">Curar</button>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection

