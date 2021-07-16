<template>

  <div style="margin: 0 auto; width: 80%">
  <Toast />
    <Panel header="EXAMEN CARLOS ALBERTO OROZCO ALBITER">
      <Menubar :model="items" />
      <p>Porfavor seleccionar una columna para editar/eliminar</p>
      <br />
      <DataTable :value="empleados" :paginator="true" :rows="10" selectionMode="single" :selection.sync="selectedEmpleado" dataKey="id">
      <Column field="id" header="ID"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="apellido" header="Apellido"></Column>
        <Column field="direccion" header="Dirección"></Column>
        <Column field="telefono" header="Teléfono"></Column>
      </DataTable>
    </Panel>
    <Dialog header="Crear Empleado" :visible.sync="displayModal" :modal="true">
      <span class="p-float-label">
        <InputText id="nombre" type="text" v-model="empleado.nombre" style="width: 100%" />
        <label for="nombre">Nombre</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="apellido" type="text" v-model="empleado.apellido" style="width: 100%" />
        <label for="apellido">Apellido</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="direccion" type="text" v-model="empleado.direccion" style="width: 100%" />
        <label for="direccion">Dirección</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="telefono" type="text" v-model="empleado.telefono" style="width: 100%" />
        <label for="telefono">Teléfono</label>
      </span>
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save" />
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import empleadoService from "../service/EmpleadoService";
export default {
  name: "CrudApp",
  data() {
    return {
      empleados: null,
      empleado: {
        id:null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null
      },
      selectedEmpleado:{
        id:null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono: null
      },
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showEditModal();
          }
        },
        {
          label: "Eliminar",
          icon: "pi pi-fw pi-trash",
           command: () => {
            this.delete();
          }
        },
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
      ],
      displayModal: false
    };
  },
  empleadoService: null,
  created() {
    this.empleadoService = new empleadoService();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    showSaveModal() {
      this.displayModal = true;
    },
     showEditModal() {
      this.empleado = this.selectedEmpleado;
       this.displayModal = true;
    },
    getAll() {
      this.empleadoService.getAll().then(data => {
        this.empleados = data.data;
      });
    },
     delete() {
     if(confirm("Estas seguro de eliminar el registro")){
      this.empleadoService.delete(this.selectedEmpleado.id).then(data => {
       if(data.status===200){
        this.$toast.add({severity:'success', summary: 'Se elimino con exito', detail:'El registro se elimino con exito', life: 3000});
       }
      });
      }
      this.getAll();
    },
    save() {
      this.empleadoService.save(this.empleado).then(data => {
        if (data.status === 200) {
          this.displayModal = false;
          this.empleado = {
            nombre: null,
            apellido: null,
            direccion: null,
            telefono: null
          };
          this.getAll();
        }
      });
    },
    closeModal() {
      this.displayModal = false;
    }
  }
};
</script>

<style>
</style>