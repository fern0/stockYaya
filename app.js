'use strict';

angular.
module('stockApp',[]).
controller('mainCtrl',function($window)
{
    var self = this;
    self.tipo = {};
    self.cantidad = 0;
    self.cantidadPedido = 0;
    self.ventas = [];
    self.total = 0;
    self.existeMsg = false;
    self.efectivo=0;
    self.pedido = false;
    self.pedidos = [];
    self.itemsPedido = [];
    self.cliente='';
    self.horaEntrega='';
    self.horaRecibido='';
    self.pagado = "NO";
    self.telefono='';
    self.empanadas = [
        {
            id: 1,
            nombre: "PINO",
            precio: 1200,
            stock: 120,
            modificar:false
        },
        {
            id: 2,
            nombre: "PINO MERKÉN",
            precio: 1200,
            stock: 11,
            modificar:false
        },
        {
            id: 3,
            nombre: "QUESO",
            precio: 1200,
            stock: 11,
            modificar:false
        },
        {
            id: 4,
            nombre: "NAPOLITANA",
            precio: 1300,
            stock: 15,
            modificar:false
        },
        {
            id: 5,
            nombre: "CHAMPIÑON QUESO",
            precio: 1400,
            stock: 20,
            modificar:false
        },
        {
            id: 6,
            nombre: "CARNE PICADA",
            precio: 1500,
            stock: 30,
            modificar:false
        },
        {
            id: 7,
            nombre: "CAMARÓN QUESO",
            precio: 1700,
            stock: 15,
            modificar:false
        },
        {
            id: 8,
            nombre: "MECHADA QUESO",
            precio: 1800,
            stock: 18,
            modificar:false
        },
    ];
    self.seleccionar = function(empanada,index)
    {
        console.log(empanada);
        self.tipo=empanada;
        self.cantidad = '';
        self.seleccionado = index;
        self.existeMsg = false;
        var element;
        if(self.pedido)
        {
            element = $window.document.getElementById('cantidadPedido');

        }
        else {
            element = $window.document.getElementById('cantidadMeson');
        }
        element.focus();
        element.value='';

    };
    self.agregar = function(estado)
    {
        console.log(estado);
        if (estado)
        {
            var existe = false;
            angular.forEach(self.ventas,function(item,$index)
            {
                if(item.id===self.tipo.id)
                {
                    existe = true;
                }
            });
            console.log(existe);
            if(!existe)
            {
                self.tipo.cantidad = self.cantidad;
                self.ventas.push(self.tipo);

                self.empanadas[self.seleccionado].stock = self.empanadas[self.seleccionado].stock - self.cantidad;
                self.total = self.total + (self.tipo.precio*self.cantidad);
                self.cantidad = 0;
            }
            else {
                self.existeMsg = true;
            }
        }
    };

    self.vender = function()
    {
        self.cantidad = 0;
        self.ventas = [];
        self.total = 0;
        self.existeMsg = false;
        self.efectivo = 0;
    };

    self.eliminar = function(idEmpanada,index){
        //saber que empanada es
        self.existeMsg = false;
        angular.forEach(self.empanadas,function(empanada,$index)
        {
            if(empanada.id===idEmpanada)
            {
                self.empanadas[$index].stock = self.empanadas[$index].stock + self.ventas[index].cantidad;
                self.total = self.total - self.ventas[index].cantidad*self.ventas[index].precio;
                self.ventas.splice(index,1);
                if(self.ventas.length===0)
                {
                    self.efectivo = 0;
                }
            }
        });

    };
    self.agregarPedido = function(estado,nombre,precio,idEmpanada)
    {
        console.log(precio);

        self.itemsPedido.push({nombre:nombre,cantidad:self.cantidadPedido,total:self.cantidadPedido*precio,id:idEmpanada});
        self.empanadas[self.seleccionado].stock = self.empanadas[self.seleccionado].stock - self.cantidadPedido;
        self.cantidadPedido = 0;
    };

    self.finalizarPedido = function()
    {
        var pedido = {cliente:self.cliente,
                        items: self.itemsPedido,
                        horaEntrega: self.horaEntrega,
                        horaRecibido: self.horaRecibido,
                        pagado: self.pagado,
                        entregado: false,
                        telefono: self.telefono,
                        completado:false,
                        bandejas:''
        };

        self.pedidos.push(pedido);
        angular.forEach(self.pedidos,function(pedido,index){
            self.pedidos[index].total = 0;
            angular.forEach(pedido.items,function(item){
                self.pedidos[index].total = self.pedidos[index].total + item.total;
            })
        })
        self.itemsPedido = [];
        self.cliente = '';
        self.cantidadPedido='';
        self.horaEntrega='';
        self.horaRecibido='';
    };

    self.borrarElementoPedido = function(idEmpanada,i)
    {
        console.log(self.itemsPedido);
        angular.forEach(self.empanadas,function(empanada,index)
        {
            if(empanada.id===idEmpanada)
            {
                self.empanadas[index].stock = self.empanadas[index].stock + self.itemsPedido[i].cantidad;
                self.itemsPedido.splice(i,1);
            }
        });
    }

    self.actualizarPedido = function(pedido,entregado)
    {
        if(entregado)
        {
            pedido.pagado = "SI";
        }
        else {
            pedido.pagado = "NO";
        }
    }

})
.directive('enter', function () {
      return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enter);
                });
                event.preventDefault();
            }
        });
      };
});
