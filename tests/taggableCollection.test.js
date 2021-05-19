import {TaggableCollection} from '../src/lib/TaggableCollection'
import {expect} from 'chai'

describe('Taggable Collection', ()=>{ 
    it('adds items and returns index', ()=>{
        const c = new TaggableCollection()
        const id1 = c.addItem(1)
        const id2 = c.addItem(1)
        expect(id1).to.not.equal(id2)

    })
    it('Adds elements and when deleted returns less elements for a tag', ()=>{
        const c = new TaggableCollection()
        const id1 = c.addItem(1)
        const id2 = c.addItem(2)
        const id3 = c.addItem(3)
        c.addTags(['tag1', 'tag2'], id1)
        c.addTags(['tag2'], id2)
        c.addTags(['tag1'], id3)
        const items1 = c.getElementsByTag('tag1')
        expect(items1).to.deep.equal([1, 3])
        const items2 = c.getElementsByTag('tag2')
        expect(items2).to.deep.equal([1, 2])
        c.deleteElementsByTag('tag2')
        const items3 = c.getElementsByTag('tag2')
        expect(items3.length).to.equal(0)
        const items4 = c.getElementsByTag('tag1')
        expect(items4.length).to.equal(1)
        expect(items4[0]).to.equal(3)
    })
    it('Returns intersection of tag sets for multiple tags', ()=>{
        const c = new TaggableCollection()
        const items = c.getElementsByTags(['tag1', 'tag3'])
        const ids = ['a', 2, 'c', 4].map((x)=>c.addItem(x))
        c.addTags(['tag1', 'tag2', 'tag3'], ids[0])
        c.addTags(['tag1', 'tag3'], ids[1])
        c.addTags(['tag1'], ids[2])
        c.addTags(['tag3'], ids[3])
        const items = c.getElementsByTags(['tag1', 'tag3'])
        expect(items.length).to.equal(2)
        expect(items).to.deep.equal(['a', 2])
        const items = c.getElementsByTags(['tag1'])
        expect(items.length).to.equal(3)
    })
    it('adds tagged element', ()=>{
        const c = new TaggableCollection()
        c.addTaggedElement(['a', 'b'], 1)
        c.addTaggedElement(['a'], 'a')
        const items = c.getElementsByTags(['a'])
        expect(items).to.deep.equal([1, 'a'])
    })

})