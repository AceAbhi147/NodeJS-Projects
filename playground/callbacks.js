const add = (nums1, nums2, callback) => {
    setTimeout(() => {
        console.log('Delay of 2 seconds')
        callback(nums1 + nums2)
    }, 2000)
}

add(10, 4, (sum) => console.log(sum))