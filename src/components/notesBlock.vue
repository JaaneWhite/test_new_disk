<template>
  <div class="notes-block">
    <note-item
        v-for="note in store.state.notesList"
        :key="note.id"
    >
      <template #title>{{note.title}}</template>
      <template #content>{{note.content}}</template>
      <template #bottom>
        <button type="button" class="note-delete-btn" @click.stop="store.dispatch('deleteNote', note.id)">Удалить</button>
      </template>
    </note-item>
    <button class="text-btn" @click.stop="store.dispatch('openModal', {formName: 'newNoteForm'})"></button>
  </div>
</template>

<script setup>
import store from "@/store.js";
import NoteItem from "@/components/noteItem.vue";


</script>

<style scoped lang="scss">
@media (min-width: 0) {
  .notes-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    //overflow: scroll;
    width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .text-btn {
    width: 56px;
    background-image: url("@/assets/icons/plus.svg");
    background-repeat: no-repeat;
    background-position: center;
    position: fixed;
    right: 12px;
    bottom: 40px;
    box-shadow: 0 15px 46px -10px #00000099;

  }
}
@media (min-width: 1366px) {
  .notes-block {
    max-width: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Адаптивные колонки */
    gap: 20px; /* Расстояние между элементами */
    padding: 0;
  }
}
@media (min-width: 1920px) {
  .notes-block {
    max-width: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    padding: 0;
  }
}

</style>