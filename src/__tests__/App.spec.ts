import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App - Todo List', () => {
  it('renders heading', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toContain('待办清单')
  })

  it('adds a todo', async () => {
    const wrapper = mount(App)
    await wrapper.find('input[placeholder]').setValue('学习 Vue')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.todo-list').text()).toContain('学习 Vue')
  })

  it('removes a todo', async () => {
    const wrapper = mount(App)
    await wrapper.find('input[placeholder]').setValue('临时任务')
    await wrapper.find('form').trigger('submit')
    await wrapper.find('.delete').trigger('click')
    expect(wrapper.find('.todo-list').text()).not.toContain('临时任务')
  })

  it('toggles done state', async () => {
    const wrapper = mount(App)
    await wrapper.find('input[placeholder]').setValue('测试任务')
    await wrapper.find('form').trigger('submit')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.find('li').classes()).toContain('done')
  })
})
