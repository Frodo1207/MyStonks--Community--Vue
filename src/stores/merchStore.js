// stores/merchStore.js
import { defineStore } from 'pinia'

export const useMerchStore = defineStore('merch', {
    state: () => ({
        merchItems: [
            {
                id: 1,
                title: "区块链信仰卫衣",
                description: "采用加密纹样设计的限量版卫衣",
                price: 0.15,
                category: "apparel",
                creator: "crypto_designer",
                image: "https://example.com/merch1.jpg"
            },
            {
                id: 2,
                title: "NFT艺术画册",
                description: "收录顶级加密艺术作品的实体画册",
                price: 0.3,
                category: "art",
                creator: "digital_artist",
                image: "https://example.com/merch2.jpg"
            },
            {
                id: 3,
                title: "硬件钱包套装",
                description: "安全存储加密资产的硬件解决方案",
                price: 1.2,
                category: "gadgets",
                creator: "security_expert",
                image: "https://example.com/merch3.jpg"
            },
            {
                id: 4,
                title: "硬件钱包套装",
                description: "安全存储加密资产的硬件解决方案",
                price: 1.2,
                category: "gadgets",
                creator: "security_expert",
                image: "https://example.com/merch3.jpg"
            },
            {
                id: 5,
                title: "硬件钱包套装",
                description: "安全存储加密资产的硬件解决方案",
                price: 1.2,
                category: "gadgets",
                creator: "security_expert",
                image: "https://example.com/merch3.jpg"
            }
        ]
    })
})
