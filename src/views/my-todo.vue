<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <div class="addtodo">
      <input
        @keyup.enter="addTodo(todo)"
        class="addtodo__input"
        v-model="todo"
        type="text"
        placeholder="Add todo..."
      />
      <button class="addtodo__button" @click="addTodo(todo)" :disabled="!todo">
        <img
          class="addtodo__icon"
          src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
        />
      </button>
    </div>
    <Teleport to="#app">
      <template v-if="showAlert">
        <DeleteModal @deleteStatus="alertHandler"></DeleteModal>
      </template>
    </Teleport>
    <div class="planned">
      <template v-if="!todoStore.getTodos || todoStore.getTodos.length < 1">
        <EmptyTodo />
      </template>
      <template v-if="showTodoList">
        <TransitionGroup
          tag="ul"
          name="list"
          class="transition-group-style"
          appear
        >
          <li
            class="planned__list"
            :class="{ done: todo.done }"
            v-for="todo in todoStore.getTodos"
            :key="todo.id"
          >
            <input
              class="planned__list__text"
              v-model="todo.content"
              change="editTodo(todo.id, todo.content)"
            />
            <div class="planned__btn">
              <div
                @click="editTodo(todo.id, todo.content)"
                class="planned__btn__delete"
              >
                <img
                  class="icon"
                  src="https://cdn-icons-png.flaticon.com/512/4476/4476194.png"
                  alt=""
                />
              </div>
              <div @click="setDone(todo.id, todo)" class="planned__btn__done">
                <img
                  class="icon"
                  src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"
                  alt=""
                />
              </div>
              <div
                @click="deleteModalOpen(todo.id)"
                class="planned__btn__delete"
              >
                <img
                  class="icon"
                  src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png"
                  alt=""
                />
              </div>
            </div>
          </li>
        </TransitionGroup>

        <div class="z-10">
          <img src="/photos/hr.png" class="h-10 w-full" alt="" />
        </div>

        <TransitionGroup
          tag="ul"
          name="list"
          class="transition-group-style"
          appear
        >
          <li
            class="planned__list"
            :class="{ done: todo.done }"
            v-for="todo in todoStore.getDoneTodos"
            :key="todo.id"
          >
            <input
              class="planned__list__text"
              v-model="todo.content"
              readonly
            />
            <div class="planned__btn">
              <div @click="setUnDone(todo.id, todo)" class="planned__btn__done">
                <img
                  class="icon"
                  src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"
                  alt=""
                />
              </div>
              <div
                @click="deleteModalOpen(todo.id)"
                class="planned__btn__delete"
              >
                <img
                  class="icon"
                  src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png"
                  alt=""
                />
              </div>
            </div>
          </li>
        </TransitionGroup>
      </template>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useTodoStore } from "../store/todo";
import EmptyTodo from "../components/EmptyTodo.vue";
import DeleteModal from "../components/modals/delete.vue";
const emits = defineEmits(["todo"]);

const todo = ref("");
const showAlert = ref(false);
const showAlertID = ref(null);
const showTodoList = ref(false);

const todoStore = useTodoStore();

onBeforeMount(async () => {
  todoStore.loadTodos();
});

onMounted(() => {
  showTodoList.value = true;
});

const deleteModalOpen = (id) => {
  showAlertID.value = id;
  showAlert.value = true;
};

const alertHandler = (status) => {
  if (!status) return (showAlert.value = false);
  todoStore.deleteTodoList(showAlertID.value);
  showAlertID.value = null;
  showAlert.value = false;
};

const setDone = (id, todo) => {
  todoStore.setTodoDone(id);
  return;
};

const setUnDone = (id) => {
  todoStore.setTodoUndone(id);
};

const editTodo = (id, todo) => {
  todoStore.editTodo(id, todo);
};
const addTodo = (Todo) => {
  let text = todo.value.trim();
  if (text.length < 1 || text == "") return alert("Invalid input");
  todoStore.addTodoList(todo.value);
  todo.value = "";
};
</script>
<style lang="scss" scoped>
.addtodo {
  @apply flex justify-center items-center w-[80%] bg-white h-10 rounded-lg z-[1];
  @apply max-w-[600px];

  &__input {
    @apply w-full ml-2 outline-none;
  }

  &__button {
    @apply flex justify-center items-center w-10 h-full;
  }

  &__icon {
    @apply w-5;
    @apply hover:scale-110;
  }
}
.planned {
  @apply w-[50%];
  @apply min-w-[350px] min-h-[50px];

  &__list {
    @apply flex items-center p-2 bg-white mb-3 rounded-md hover:scale-105 transition;
    @apply min-h-[50px] min-w-[300px];
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }

  &__list__text {
    @apply flex-1 overflow-hidden outline-none;
    background-color: rgba(240, 248, 255, 0);
  }

  &__btn {
    @apply flex ml-auto gap-2;
    @apply min-w-[60px];

    .icon {
      @apply w-[25px] cursor-pointer hover:scale-110;
    }
  }
  .done {
    @apply text-gray-400 line-through bg-green-300;
  }
}
</style>