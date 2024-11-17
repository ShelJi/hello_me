from icecream import ic

    
class Solution:
    def shortestSubarray(self, nums: list[int], k: int) -> int:
        total: int = 0
        for num in nums:
            total += num
        ic(total)
        ic(len(nums))
        if len(nums) >= k and total >= k:
            return len(nums)
        else:
            return -1
        
        
nums = [77,19,35,10,-14]

k = 19

sol = Solution()
ic(sol.shortestSubarray(nums, k))

# ans 1