import { writable } from "svelte/store";

const characterState = {
  name: "",
  title: "",
  race: "",
  age: 0,
  attitude: "",
  religion: "",
  klass: "", // класс персонажа, class слово зарезервированное
  skills: [],
  strength: 0,
  agility: 0,
  intelligence: 0
};

export const character = writable(characterState);

export const navigation = writable({
  isForward: false
});