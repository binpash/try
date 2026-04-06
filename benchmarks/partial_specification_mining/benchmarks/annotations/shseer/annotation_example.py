# Script:
# rm /foo.txt 
# rm /boo.txt
# test -f /foo.txt 

# Define existential variables
r, rp, a, rpp, b, c = cn.get_new_existentials(6)
foo = Feature("foo.txt")
boo = Feature("boo.txt")
fset_foo = FSet({foo})
fsetC_foo = FComp({foo})
fset_boo = FSet({boo})
fsetC_boo = FComp({boo})

# Command: rm /foo.txt
# Preconditions
cn.add_literal(Hasf(r, foo, a))  # c has a feature foo.txt to the node e
cn.add_literal(AbsF(a, CompleteSet()))  # e has no children i.e., e is a file
# Update Condition
cn.add_literal(SimF(r, fsetC_foo, rp))  # c is similar to d on all features except foo.txt
#Post Condition
cn.add_literal(AbsF(rp, fset_foo))  # d has no feature foo.txt
cn.add_literal(NegAtom(AbsF(rp, CompleteSet())))  # d has some feature


# Command: rm /boo.txt
# Preconditions
cn.add_literal(Hasf(rp, boo, b))  # p has a feature boo.txt to the node r
cn.add_literal(AbsF(b, CompleteSet()))  # r has no children i.e., r is a file
#Update Condition
cn.add_literal(SimF(rp, fsetC_boo, rpp))  # p is similar to q on all features except boo.txt
# Post Condition
cn.add_literal(AbsF(rpp, fset_boo))  # q has no feature boo.txt
cn.add_literal(NegAtom(AbsF(rpp, CompleteSet())))  # q has some feature


# Command: test -f /foo.txt
# Precondition
check_constraint(cn)
cn.add_literal(Hasf(rpp, foo, c))  # B has a feature foo.txt to the node D
cn.add_literal(AbsF(c, CompleteSet()))  # C has no children i.e., C is a file
check_constraint(cn)
