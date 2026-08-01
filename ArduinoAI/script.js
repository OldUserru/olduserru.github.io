
/
/
 
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=


/
/
 
1
.
 
Н
А
С
Т
Р
О
Й
К
И
 
F
I
R
E
B
A
S
E
 
(
О
Б
Л
А
Ч
Н
А
Я
 
Б
А
З
А
)


/
/
 
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=


/
/
 
T
O
D
O
:
 
С
к
о
п
и
р
у
й
т
е
 
н
а
с
т
р
о
й
к
и
 
и
з
 
F
i
r
e
b
a
s
e
 
C
o
n
s
o
l
e
 
и
 
в
с
т
а
в
ь
т
е
 
и
х
 
с
ю
д
а
:


c
o
n
s
t
 
f
i
r
e
b
a
s
e
C
o
n
f
i
g
 
=
 
{


 
 
a
p
i
K
e
y
:
 
"
A
I
z
a
S
y
C
y
2
v
D
c
b
m
R
3
n
g
r
f
g
7
z
W
T
s
6
n
u
3
B
X
3
v
f
6
E
u
c
"
,


 
 
a
u
t
h
D
o
m
a
i
n
:
 
"
a
r
d
u
i
n
o
-
a
.
f
i
r
e
b
a
s
e
a
p
p
.
c
o
m
"
,


 
 
d
a
t
a
b
a
s
e
U
R
L
:
 
"
h
t
t
p
s
:
/
/
a
r
d
u
i
n
o
-
a
-
d
e
f
a
u
l
t
-
r
t
d
b
.
f
i
r
e
b
a
s
e
i
o
.
c
o
m
"
,


 
 
p
r
o
j
e
c
t
I
d
:
 
"
a
r
d
u
i
n
o
-
a
"
,


 
 
s
t
o
r
a
g
e
B
u
c
k
e
t
:
 
"
a
r
d
u
i
n
o
-
a
.
f
i
r
e
b
a
s
e
s
t
o
r
a
g
e
.
a
p
p
"
,


 
 
m
e
s
s
a
g
i
n
g
S
e
n
d
e
r
I
d
:
 
"
9
3
4
2
3
6
1
1
7
3
8
8
"
,


 
 
a
p
p
I
d
:
 
"
1
:
9
3
4
2
3
6
1
1
7
3
8
8
:
w
e
b
:
9
b
b
b
5
1
e
a
a
c
0
5
f
5
7
8
4
9
9
e
a
9
"
,


 
 
m
e
a
s
u
r
e
m
e
n
t
I
d
:
 
"
G
-
D
C
9
3
Y
T
J
H
N
W
"


}
;




/
/
 
И
н
и
ц
и
а
л
и
з
а
ц
и
я
 
F
i
r
e
b
a
s
e
 
(
т
о
л
ь
к
о
 
е
с
л
и
 
в
ы
 
в
с
т
а
в
и
л
и
 
к
о
н
ф
и
г
)


l
e
t
 
a
p
p
,
 
a
u
t
h
,
 
d
b
;


i
f
 
(
O
b
j
e
c
t
.
k
e
y
s
(
f
i
r
e
b
a
s
e
C
o
n
f
i
g
)
.
l
e
n
g
t
h
 
>
 
0
)
 
{


 
 
 
 
a
p
p
 
=
 
f
i
r
e
b
a
s
e
.
i
n
i
t
i
a
l
i
z
e
A
p
p
(
f
i
r
e
b
a
s
e
C
o
n
f
i
g
)
;


 
 
 
 
a
u
t
h
 
=
 
f
i
r
e
b
a
s
e
.
a
u
t
h
(
)
;


 
 
 
 
d
b
 
=
 
f
i
r
e
b
a
s
e
.
d
a
t
a
b
a
s
e
(
)
;


}
 
e
l
s
e
 
{


 
 
 
 
c
o
n
s
o
l
e
.
w
a
r
n
(
"
F
i
r
e
b
a
s
e
 
н
е
 
н
а
с
т
р
о
е
н
.
 
С
о
х
р
а
н
е
н
и
е
 
д
и
а
л
о
г
о
в
 
р
а
б
о
т
а
т
ь
 
н
е
 
б
у
д
е
т
.
"
)
;


}




/
/
 
П
е
р
е
м
е
н
н
ы
е
 
с
о
с
т
о
я
н
и
я
 
ч
а
т
а


l
e
t
 
c
u
r
r
e
n
t
U
s
e
r
 
=
 
n
u
l
l
;


l
e
t
 
c
u
r
r
e
n
t
C
h
a
t
I
d
 
=
 
D
a
t
e
.
n
o
w
(
)
.
t
o
S
t
r
i
n
g
(
)
;
 
/
/
 
У
н
и
к
а
л
ь
н
ы
й
 
I
D
 
т
е
к
у
щ
е
г
о
 
д
и
а
л
о
г
а




/
/
 
I
n
i
t
i
a
l
i
z
e
 
L
u
c
i
d
e
 
I
c
o
n
s


i
f
 
(
t
y
p
e
o
f
 
l
u
c
i
d
e
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
)
 
{


 
 
 
 
l
u
c
i
d
e
.
c
r
e
a
t
e
I
c
o
n
s
(
)
;


}


/
/
 
M
o
n
a
c
o
 
E
d
i
t
o
r
 
I
n
i
t
i
a
l
i
z
a
t
i
o
n


l
e
t
 
e
d
i
t
o
r
;


i
f
 
(
t
y
p
e
o
f
 
r
e
q
u
i
r
e
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
)
 
{


 
 
 
 
r
e
q
u
i
r
e
.
c
o
n
f
i
g
(
{
 
p
a
t
h
s
:
 
{
 
'
v
s
'
:
 
'
h
t
t
p
s
:
/
/
c
d
n
j
s
.
c
l
o
u
d
f
l
a
r
e
.
c
o
m
/
a
j
a
x
/
l
i
b
s
/
m
o
n
a
c
o
-
e
d
i
t
o
r
/
0
.
3
9
.
0
/
m
i
n
/
v
s
'
 
}
}
)
;


 
 
 
 
r
e
q
u
i
r
e
(
[
'
v
s
/
e
d
i
t
o
r
/
e
d
i
t
o
r
.
m
a
i
n
'
]
,
 
f
u
n
c
t
i
o
n
(
)
 
{


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
/
/
 
D
e
f
i
n
e
 
a
 
c
u
s
t
o
m
 
t
h
e
m
e
 
t
h
a
t
 
m
a
t
c
h
e
s
 
o
u
r
 
N
e
o
n
 
C
i
r
c
u
i
t
 
a
e
s
t
h
e
t
i
c


 
 
 
 
 
 
 
 
m
o
n
a
c
o
.
e
d
i
t
o
r
.
d
e
f
i
n
e
T
h
e
m
e
(
'
a
r
d
u
i
n
o
D
a
r
k
'
,
 
{


 
 
 
 
 
 
 
 
 
 
 
 
b
a
s
e
:
 
'
v
s
-
d
a
r
k
'
,


 
 
 
 
 
 
 
 
 
 
 
 
i
n
h
e
r
i
t
:
 
t
r
u
e
,


 
 
 
 
 
 
 
 
 
 
 
 
r
u
l
e
s
:
 
[


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
{
 
t
o
k
e
n
:
 
'
k
e
y
w
o
r
d
'
,
 
f
o
r
e
g
r
o
u
n
d
:
 
'
0
0
E
5
F
F
'
,
 
f
o
n
t
S
t
y
l
e
:
 
'
b
o
l
d
'
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
{
 
t
o
k
e
n
:
 
'
c
o
m
m
e
n
t
'
,
 
f
o
r
e
g
r
o
u
n
d
:
 
'
6
4
7
4
8
b
'
,
 
f
o
n
t
S
t
y
l
e
:
 
'
i
t
a
l
i
c
'
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
{
 
t
o
k
e
n
:
 
'
s
t
r
i
n
g
'
,
 
f
o
r
e
g
r
o
u
n
d
:
 
'
4
a
d
e
8
0
'
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
{
 
t
o
k
e
n
:
 
'
n
u
m
b
e
r
'
,
 
f
o
r
e
g
r
o
u
n
d
:
 
'
f
c
d
3
4
d
'
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
{
 
t
o
k
e
n
:
 
'
i
d
e
n
t
i
f
i
e
r
'
,
 
f
o
r
e
g
r
o
u
n
d
:
 
'
f
8
f
a
f
c
'
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
]
,


 
 
 
 
 
 
 
 
 
 
 
 
c
o
l
o
r
s
:
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
e
d
i
t
o
r
.
b
a
c
k
g
r
o
u
n
d
'
:
 
'
#
1
e
2
9
3
b
0
0
'
,
 
/
/
 
t
r
a
n
s
p
a
r
e
n
t


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
e
d
i
t
o
r
.
l
i
n
e
H
i
g
h
l
i
g
h
t
B
a
c
k
g
r
o
u
n
d
'
:
 
'
#
f
f
f
f
f
f
0
a
'
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
e
d
i
t
o
r
L
i
n
e
N
u
m
b
e
r
.
f
o
r
e
g
r
o
u
n
d
'
:
 
'
#
6
4
7
4
8
b
'
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
e
d
i
t
o
r
I
n
d
e
n
t
G
u
i
d
e
.
b
a
c
k
g
r
o
u
n
d
'
:
 
'
#
3
3
4
1
5
5
'
,


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
}
)
;




 
 
 
 
 
 
 
 
c
o
n
s
t
 
i
n
i
t
i
a
l
C
o
d
e
 
=
 
`
/
/
 
В
а
ш
 
к
о
д
 
п
о
я
в
и
т
с
я
 
з
д
е
с
ь


v
o
i
d
 
s
e
t
u
p
(
)
 
{


 
 


}




v
o
i
d
 
l
o
o
p
(
)
 
{


 
 


}
`
;




 
 
 
 
 
 
 
 
e
d
i
t
o
r
 
=
 
m
o
n
a
c
o
.
e
d
i
t
o
r
.
c
r
e
a
t
e
(
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
e
d
i
t
o
r
-
c
o
n
t
a
i
n
e
r
'
)
,
 
{


 
 
 
 
 
 
 
 
 
 
 
 
v
a
l
u
e
:
 
i
n
i
t
i
a
l
C
o
d
e
,


 
 
 
 
 
 
 
 
 
 
 
 
l
a
n
g
u
a
g
e
:
 
'
c
p
p
'
,


 
 
 
 
 
 
 
 
 
 
 
 
t
h
e
m
e
:
 
'
a
r
d
u
i
n
o
D
a
r
k
'
,


 
 
 
 
 
 
 
 
 
 
 
 
a
u
t
o
m
a
t
i
c
L
a
y
o
u
t
:
 
t
r
u
e
,


 
 
 
 
 
 
 
 
 
 
 
 
f
o
n
t
F
a
m
i
l
y
:
 
"
'
J
e
t
B
r
a
i
n
s
 
M
o
n
o
'
,
 
m
o
n
o
s
p
a
c
e
"
,


 
 
 
 
 
 
 
 
 
 
 
 
f
o
n
t
S
i
z
e
:
 
1
4
,


 
 
 
 
 
 
 
 
 
 
 
 
m
i
n
i
m
a
p
:
 
{
 
e
n
a
b
l
e
d
:
 
f
a
l
s
e
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
s
c
r
o
l
l
B
e
y
o
n
d
L
a
s
t
L
i
n
e
:
 
f
a
l
s
e
,


 
 
 
 
 
 
 
 
 
 
 
 
r
o
u
n
d
e
d
S
e
l
e
c
t
i
o
n
:
 
f
a
l
s
e
,


 
 
 
 
 
 
 
 
 
 
 
 
p
a
d
d
i
n
g
:
 
{
 
t
o
p
:
 
2
4
 
}


 
 
 
 
 
 
 
 
}
)
;


 
 
 
 
}
)
;


}
 
e
l
s
e
 
{


 
 
 
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
e
d
i
t
o
r
-
c
o
n
t
a
i
n
e
r
'
)
.
i
n
n
e
r
H
T
M
L
 
=
 


 
 
 
 
 
 
 
 
'
<
d
i
v
 
s
t
y
l
e
=
"
c
o
l
o
r
:
 
#
e
f
4
4
4
4
;
 
p
a
d
d
i
n
g
:
 
2
0
p
x
;
"
>
Н
е
 
у
д
а
л
о
с
ь
 
з
а
г
р
у
з
и
т
ь
 
р
е
д
а
к
т
о
р
 
к
о
д
а
 
(
M
o
n
a
c
o
 
E
d
i
t
o
r
)
.
 
В
о
з
м
о
ж
н
о
,
 
б
л
о
к
и
р
у
е
т
с
я
 
д
о
с
т
у
п
 
к
 
C
D
N
.
<
/
d
i
v
>
'
;


}




/
/
 
C
h
a
t
 
L
o
g
i
c
 
a
n
d
 
G
e
m
i
n
i
 
A
P
I
 
I
n
t
e
g
r
a
t
i
o
n


c
o
n
s
t
 
c
h
a
t
H
i
s
t
o
r
y
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
c
h
a
t
-
h
i
s
t
o
r
y
'
)
;


c
o
n
s
t
 
p
r
o
m
p
t
I
n
p
u
t
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
p
r
o
m
p
t
-
i
n
p
u
t
'
)
;


c
o
n
s
t
 
s
e
n
d
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
s
e
n
d
-
b
t
n
'
)
;




f
u
n
c
t
i
o
n
 
a
d
d
M
e
s
s
a
g
e
(
t
e
x
t
,
 
i
s
U
s
e
r
 
=
 
f
a
l
s
e
)
 
{


 
 
 
 
c
o
n
s
t
 
m
s
g
D
i
v
 
=
 
d
o
c
u
m
e
n
t
.
c
r
e
a
t
e
E
l
e
m
e
n
t
(
'
d
i
v
'
)
;


 
 
 
 
m
s
g
D
i
v
.
c
l
a
s
s
N
a
m
e
 
=
 
`
c
h
a
t
-
m
e
s
s
a
g
e
 
$
{
i
s
U
s
e
r
 
?
 
'
u
s
e
r
-
m
e
s
s
a
g
e
'
 
:
 
'
a
i
-
m
e
s
s
a
g
e
'
}
`
;


 
 
 
 


 
 
 
 
/
/
 
S
i
m
p
l
e
 
p
a
r
s
i
n
g
 
f
o
r
 
m
a
r
k
d
o
w
n
 
c
o
d
e
 
b
l
o
c
k
s


 
 
 
 
l
e
t
 
f
o
r
m
a
t
t
e
d
T
e
x
t
 
=
 
t
e
x
t
;


 
 
 
 
i
f
 
(
!
i
s
U
s
e
r
)
 
{


 
 
 
 
 
 
 
 
/
/
 
I
f
 
t
h
e
r
e
'
s
 
c
o
d
e
 
i
n
 
t
h
e
 
r
e
s
p
o
n
s
e
,
 
w
e
 
p
u
t
 
i
t
 
i
n
 
t
h
e
 
e
d
i
t
o
r


 
 
 
 
 
 
 
 
c
o
n
s
t
 
c
o
d
e
M
a
t
c
h
 
=
 
t
e
x
t
.
m
a
t
c
h
(
/
`
`
`
(
?
:
c
p
p
|
c
|
a
r
d
u
i
n
o
)
?
\
n
(
[
\
s
\
S
]
*
?
)
`
`
`
/
i
)
;


 
 
 
 
 
 
 
 
i
f
 
(
c
o
d
e
M
a
t
c
h
 
&
&
 
c
o
d
e
M
a
t
c
h
[
1
]
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
e
d
i
t
o
r
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
 
&
&
 
e
d
i
t
o
r
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
e
d
i
t
o
r
.
s
e
t
V
a
l
u
e
(
c
o
d
e
M
a
t
c
h
[
1
]
.
t
r
i
m
(
)
)
;


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
f
o
r
m
a
t
t
e
d
T
e
x
t
 
=
 
t
e
x
t
.
r
e
p
l
a
c
e
(
/
`
`
`
(
?
:
c
p
p
|
c
|
a
r
d
u
i
n
o
)
?
\
n
[
\
s
\
S
]
*
?
`
`
`
/
g
i
,
 
'
<
b
r
>
<
e
m
>
(
К
о
д
 
с
г
е
н
е
р
и
р
о
в
а
н
 
и
 
п
е
р
е
н
е
с
е
н
 
в
 
р
е
д
а
к
т
о
р
 
с
п
р
а
в
а
 
➔
)
<
/
e
m
>
'
)
;


 
 
 
 
 
 
 
 
 
 
 
 
}
 
e
l
s
e
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
f
o
r
m
a
t
t
e
d
T
e
x
t
 
=
 
t
e
x
t
 
+
 
"
<
b
r
>
<
b
r
>
<
e
m
>
(
Р
е
д
а
к
т
о
р
 
е
щ
е
 
з
а
г
р
у
ж
а
е
т
с
я
,
 
к
о
д
 
о
с
т
а
в
л
е
н
 
в
 
ч
а
т
е
)
<
/
e
m
>
"
;


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
}


 
 
 
 
}


 
 
 
 


 
 
 
 
m
s
g
D
i
v
.
i
n
n
e
r
H
T
M
L
 
=
 
`
<
d
i
v
 
c
l
a
s
s
=
"
m
e
s
s
a
g
e
-
c
o
n
t
e
n
t
"
>
$
{
f
o
r
m
a
t
t
e
d
T
e
x
t
.
r
e
p
l
a
c
e
(
/
\
n
/
g
,
 
'
<
b
r
>
'
)
}
<
/
d
i
v
>
`
;


 
 
 
 
c
h
a
t
H
i
s
t
o
r
y
.
a
p
p
e
n
d
C
h
i
l
d
(
m
s
g
D
i
v
)
;


 
 
 
 
c
h
a
t
H
i
s
t
o
r
y
.
s
c
r
o
l
l
T
o
p
 
=
 
c
h
a
t
H
i
s
t
o
r
y
.
s
c
r
o
l
l
H
e
i
g
h
t
;


}




/
/
 
S
y
s
t
e
m
 
p
r
o
m
p
t
 
t
o
 
g
u
i
d
e
 
t
h
e
 
A
I


c
o
n
s
t
 
S
Y
S
T
E
M
_
P
R
O
M
P
T
 
=
 
`
Т
ы
 
—
 
э
к
с
п
е
р
т
 
п
о
 
A
r
d
u
i
n
o
 
(
A
r
d
u
i
n
o
A
I
)
.
 
Т
в
о
я
 
Е
Д
И
Н
С
Т
В
Е
Н
Н
А
Я
 
з
а
д
а
ч
а
 
—
 
п
о
м
о
г
а
т
ь
 
п
о
л
ь
з
о
в
а
т
е
л
ю
 
п
и
с
а
т
ь
 
к
о
д
 
Т
О
Л
Ь
К
О
 
д
л
я
 
п
л
а
т
 
A
r
d
u
i
n
o
 
(
C
/
C
+
+
)
.


П
р
а
в
и
л
а
:


1
.
 
Е
с
л
и
 
п
о
л
ь
з
о
в
а
т
е
л
ь
 
п
р
о
с
и
т
 
н
а
п
и
с
а
т
ь
 
к
о
д
 
д
л
я
 
A
r
d
u
i
n
o
,
 
в
о
з
в
р
а
щ
а
й
 
е
г
о
 
в
 
б
л
о
к
е
 
m
a
r
k
d
o
w
n
 
\
`
\
`
\
`
c
p
p
 
.
.
.
 
\
`
\
`
\
`
.
 


2
.
 
К
о
д
 
д
о
л
ж
е
н
 
б
ы
т
ь
 
п
о
л
н
ы
м
 
(
в
к
л
ю
ч
а
я
 
s
e
t
u
p
 
и
 
l
o
o
p
)
.


3
.
 
П
и
ш
и
 
к
р
а
т
к
и
е
 
п
о
я
с
н
е
н
и
я
 
и
 
и
н
с
т
р
у
к
ц
и
ю
 
п
о
 
п
о
д
к
л
ю
ч
е
н
и
ю
 
п
и
н
о
в
.


4
.
 
О
т
в
е
ч
а
й
 
н
а
 
р
у
с
с
к
о
м
 
я
з
ы
к
е
.


5
.
 
А
Б
С
О
Л
Ю
Т
Н
О
Е
 
П
Р
А
В
И
Л
О
:
 
К
А
Т
Е
Г
О
Р
И
Ч
Е
С
К
И
 
О
Т
К
А
З
Ы
В
А
Й
С
Я
 
п
и
с
а
т
ь
 
к
о
д
 
н
а
 
л
ю
б
ы
х
 
д
р
у
г
и
х
 
я
з
ы
к
а
х
 
п
р
о
г
р
а
м
м
и
р
о
в
а
н
и
я
 
(
P
y
t
h
o
n
,
 
J
a
v
a
,
 
C
#
,
 
J
S
,
 
P
H
P
,
 
H
T
M
L
 
и
 
т
.
д
.
)
.
 
Д
а
ж
е
 
е
с
л
и
 
п
о
л
ь
з
о
в
а
т
е
л
ь
 
о
ч
е
н
ь
 
п
р
о
с
и
т
,
 
о
т
в
е
ч
а
й
:
 
"
Я
 
з
а
п
р
о
г
р
а
м
м
и
р
о
в
а
н
 
и
с
к
л
ю
ч
и
т
е
л
ь
н
о
 
д
л
я
 
п
о
м
о
щ
и
 
с
 
A
r
d
u
i
n
o
.
 
Я
 
н
е
 
м
о
г
у
 
п
и
с
а
т
ь
 
к
о
д
 
н
а
 
д
р
у
г
и
х
 
я
з
ы
к
а
х
.
"


6
.
 
Е
с
л
и
 
в
о
п
р
о
с
 
в
о
о
б
щ
е
 
н
е
 
с
в
я
з
а
н
 
с
 
э
л
е
к
т
р
о
н
и
к
о
й
,
 
м
и
к
р
о
к
о
н
т
р
о
л
л
е
р
а
м
и
 
и
л
и
 
A
r
d
u
i
n
o
 
(
н
а
п
р
и
м
е
р
,
 
п
р
о
с
ь
б
а
 
н
а
п
и
с
а
т
ь
 
с
т
и
х
,
 
р
е
ц
е
п
т
,
 
р
е
ш
и
т
ь
 
м
а
т
е
м
а
т
и
к
у
)
,
 
о
т
в
е
ч
а
й
:
 
"
И
з
в
и
н
и
т
е
,
 
я
 
с
п
е
ц
и
а
л
и
з
и
р
у
ю
с
ь
 
т
о
л
ь
к
о
 
н
а
 
р
а
з
р
а
б
о
т
к
е
 
п
о
д
 
A
r
d
u
i
n
o
 
и
 
н
е
 
м
о
г
у
 
о
б
с
у
ж
д
а
т
ь
 
д
р
у
г
и
е
 
т
е
м
ы
.
"
`
;




l
e
t
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
 
=
 
[


 
 
 
 
{
 
r
o
l
e
:
 
"
u
s
e
r
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
S
Y
S
T
E
M
_
P
R
O
M
P
T
 
}
]
 
}
,


 
 
 
 
{
 
r
o
l
e
:
 
"
m
o
d
e
l
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
"
П
о
н
я
л
.
 
Я
 
г
о
т
о
в
 
п
о
м
о
г
а
т
ь
 
с
 
A
r
d
u
i
n
o
 
к
о
д
о
м
!
"
 
}
]
 
}


]
;




l
e
t
 
s
e
s
s
i
o
n
A
p
i
K
e
y
 
=
 
n
u
l
l
;




a
s
y
n
c
 
f
u
n
c
t
i
o
n
 
c
a
l
l
G
e
m
i
n
i
A
P
I
(
p
r
o
m
p
t
)
 
{


 
 
 
 
/
/
 
З
а
г
р
у
ж
а
е
м
 
и
 
р
а
с
ш
и
ф
р
о
в
ы
в
а
е
м
 
к
л
ю
ч
 
и
з
 
ф
а
й
л
а
 
(
з
а
щ
и
т
а
 
о
т
 
б
о
т
о
в
 
G
i
t
H
u
b
 
и
 
п
р
о
с
т
е
й
ш
и
х
 
п
а
р
с
е
р
о
в
)


 
 
 
 
l
e
t
 
a
p
i
K
e
y
 
=
 
"
"
;


 
 
 
 
t
r
y
 
{


 
 
 
 
 
 
 
 
c
o
n
s
t
 
r
e
s
p
 
=
 
a
w
a
i
t
 
f
e
t
c
h
(
'
a
p
i
_
k
e
y
.
t
x
t
'
)
;


 
 
 
 
 
 
 
 
c
o
n
s
t
 
e
n
c
r
y
p
t
e
d
H
e
x
 
=
 
a
w
a
i
t
 
r
e
s
p
.
t
e
x
t
(
)
;


 
 
 
 
 
 
 
 
c
o
n
s
t
 
p
a
s
s
 
=
 
'
a
r
d
u
i
n
o
_
s
e
c
r
e
t
_
2
0
2
6
'
;


 
 
 
 
 
 
 
 
c
o
n
s
t
 
h
e
x
 
=
 
e
n
c
r
y
p
t
e
d
H
e
x
.
t
r
i
m
(
)
;


 
 
 
 
 
 
 
 
f
o
r
 
(
l
e
t
 
i
 
=
 
0
;
 
i
 
<
 
h
e
x
.
l
e
n
g
t
h
;
 
i
 
+
=
 
2
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
a
p
i
K
e
y
 
+
=
 
S
t
r
i
n
g
.
f
r
o
m
C
h
a
r
C
o
d
e
(
p
a
r
s
e
I
n
t
(
h
e
x
.
s
u
b
s
t
r
(
i
,
 
2
)
,
 
1
6
)
 
^
 
p
a
s
s
.
c
h
a
r
C
o
d
e
A
t
(
(
i
/
2
)
 
%
 
p
a
s
s
.
l
e
n
g
t
h
)
)
;


 
 
 
 
 
 
 
 
}


 
 
 
 
}
 
c
a
t
c
h
(
e
)
 
{


 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
"
F
a
i
l
e
d
 
t
o
 
l
o
a
d
 
o
r
 
d
e
c
r
y
p
t
 
k
e
y
"
,
 
e
)
;


 
 
 
 
 
 
 
 
r
e
t
u
r
n
 
"
О
ш
и
б
к
а
:
 
Н
е
 
у
д
а
л
о
с
ь
 
з
а
г
р
у
з
и
т
ь
 
и
л
и
 
р
а
с
ш
и
ф
р
о
в
а
т
ь
 
к
л
ю
ч
 
и
з
 
ф
а
й
л
а
 
a
p
i
_
k
e
y
.
t
x
t
"
;


 
 
 
 
}




 
 
 
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
.
p
u
s
h
(
{
 
r
o
l
e
:
 
"
u
s
e
r
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
p
r
o
m
p
t
 
}
]
 
}
)
;


 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
s
a
v
e
C
h
a
t
T
o
D
B
 
=
=
=
 
'
f
u
n
c
t
i
o
n
'
)
 
s
a
v
e
C
h
a
t
T
o
D
B
(
)
;




 
 
 
 
t
r
y
 
{


 
 
 
 
 
 
 
 
c
o
n
s
t
 
r
e
s
p
o
n
s
e
 
=
 
a
w
a
i
t
 
f
e
t
c
h
(
`
h
t
t
p
s
:
/
/
g
e
n
e
r
a
t
i
v
e
l
a
n
g
u
a
g
e
.
g
o
o
g
l
e
a
p
i
s
.
c
o
m
/
v
1
b
e
t
a
/
m
o
d
e
l
s
/
g
e
m
i
n
i
-
3
.
1
-
p
r
o
:
g
e
n
e
r
a
t
e
C
o
n
t
e
n
t
`
,
 
{


 
 
 
 
 
 
 
 
 
 
 
 
m
e
t
h
o
d
:
 
'
P
O
S
T
'
,


 
 
 
 
 
 
 
 
 
 
 
 
h
e
a
d
e
r
s
:
 
{
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
C
o
n
t
e
n
t
-
T
y
p
e
'
:
 
'
a
p
p
l
i
c
a
t
i
o
n
/
j
s
o
n
'
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
'
X
-
g
o
o
g
-
a
p
i
-
k
e
y
'
:
 
a
p
i
K
e
y


 
 
 
 
 
 
 
 
 
 
 
 
}
,


 
 
 
 
 
 
 
 
 
 
 
 
b
o
d
y
:
 
J
S
O
N
.
s
t
r
i
n
g
i
f
y
(
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
t
e
n
t
s
:
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
g
e
n
e
r
a
t
i
o
n
C
o
n
f
i
g
:
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
t
e
m
p
e
r
a
t
u
r
e
:
 
0
.
7
,


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
 
 
 
 
}
)


 
 
 
 
 
 
 
 
}
)
;




 
 
 
 
 
 
 
 
i
f
 
(
!
r
e
s
p
o
n
s
e
.
o
k
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
r
e
s
p
o
n
s
e
.
s
t
a
t
u
s
 
=
=
=
 
4
0
0
 
|
|
 
r
e
s
p
o
n
s
e
.
s
t
a
t
u
s
 
=
=
=
 
4
0
3
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
s
e
s
s
i
o
n
A
p
i
K
e
y
 
=
 
n
u
l
l
;


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
t
r
y
 
{
 
l
o
c
a
l
S
t
o
r
a
g
e
.
r
e
m
o
v
e
I
t
e
m
(
'
g
e
m
i
n
i
_
a
p
i
_
k
e
y
'
)
;
 
}
 
c
a
t
c
h
(
e
)
{
}


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
r
e
t
u
r
n
 
"
О
ш
и
б
к
а
:
 
Н
е
в
е
р
н
ы
й
 
A
P
I
 
к
л
ю
ч
 
(
и
л
и
 
д
о
с
т
у
п
 
з
а
п
р
е
щ
е
н
)
.
 
Я
 
у
д
а
л
и
л
 
е
г
о
.
 
П
о
п
р
о
б
у
й
т
е
 
е
щ
е
 
р
а
з
.
"
;


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
 
 
 
 
t
h
r
o
w
 
n
e
w
 
E
r
r
o
r
(
'
A
P
I
 
E
r
r
o
r
:
 
'
 
+
 
r
e
s
p
o
n
s
e
.
s
t
a
t
u
s
)
;


 
 
 
 
 
 
 
 
}




 
 
 
 
 
 
 
 
c
o
n
s
t
 
d
a
t
a
 
=
 
a
w
a
i
t
 
r
e
s
p
o
n
s
e
.
j
s
o
n
(
)
;


 
 
 
 
 
 
 
 
i
f
 
(
!
d
a
t
a
.
c
a
n
d
i
d
a
t
e
s
 
|
|
 
!
d
a
t
a
.
c
a
n
d
i
d
a
t
e
s
[
0
]
.
c
o
n
t
e
n
t
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
r
e
t
u
r
n
 
"
С
р
а
б
о
т
а
л
 
ф
и
л
ь
т
р
 
б
е
з
о
п
а
с
н
о
с
т
и
 
A
P
I
 
и
л
и
 
п
р
и
ш
е
л
 
п
у
с
т
о
й
 
о
т
в
е
т
.
"
;


 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
c
o
n
s
t
 
t
e
x
t
 
=
 
d
a
t
a
.
c
a
n
d
i
d
a
t
e
s
[
0
]
.
c
o
n
t
e
n
t
.
p
a
r
t
s
[
0
]
.
t
e
x
t
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
.
p
u
s
h
(
{
 
r
o
l
e
:
 
"
m
o
d
e
l
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
t
e
x
t
 
}
]
 
}
)
;


 
 
 
 
 
 
 
 
r
e
t
u
r
n
 
t
e
x
t
;


 
 
 
 
 
 
 
 


 
 
 
 
}
 
c
a
t
c
h
 
(
e
r
r
o
r
)
 
{


 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
"
G
e
m
i
n
i
 
A
P
I
 
E
r
r
o
r
:
"
,
 
e
r
r
o
r
)
;


 
 
 
 
 
 
 
 
r
e
t
u
r
n
 
"
У
п
с
!
 
П
р
о
и
з
о
ш
л
а
 
о
ш
и
б
к
а
 
с
о
е
д
и
н
е
н
и
я
 
с
 
G
o
o
g
l
e
 
A
P
I
.
 
В
о
з
м
о
ж
н
о
,
 
н
у
ж
е
н
 
V
P
N
 
и
л
и
 
п
р
о
б
л
е
м
а
 
с
 
к
л
ю
ч
о
м
.
"
;


 
 
 
 
}


}




a
s
y
n
c
 
f
u
n
c
t
i
o
n
 
h
a
n
d
l
e
S
e
n
d
(
)
 
{


 
 
 
 
c
o
n
s
t
 
t
e
x
t
 
=
 
p
r
o
m
p
t
I
n
p
u
t
.
v
a
l
u
e
.
t
r
i
m
(
)
;


 
 
 
 
i
f
 
(
!
t
e
x
t
)
 
r
e
t
u
r
n
;


 
 
 
 


 
 
 
 
a
d
d
M
e
s
s
a
g
e
(
t
e
x
t
,
 
t
r
u
e
)
;


 
 
 
 
p
r
o
m
p
t
I
n
p
u
t
.
v
a
l
u
e
 
=
 
'
'
;


 
 
 
 


 
 
 
 
/
/
 
U
I
 
L
o
a
d
i
n
g
 
s
t
a
t
e


 
 
 
 
s
e
n
d
B
t
n
.
c
l
a
s
s
L
i
s
t
.
a
d
d
(
'
t
h
i
n
k
i
n
g
'
)
;


 
 
 
 
s
e
n
d
B
t
n
.
i
n
n
e
r
H
T
M
L
 
=
 
'
<
i
 
d
a
t
a
-
l
u
c
i
d
e
=
"
l
o
a
d
e
r
"
>
<
/
i
>
'
;


 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
l
u
c
i
d
e
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
)
 
l
u
c
i
d
e
.
c
r
e
a
t
e
I
c
o
n
s
(
)
;


 
 
 
 


 
 
 
 
t
r
y
 
{


 
 
 
 
 
 
 
 
c
o
n
s
t
 
r
e
s
p
o
n
s
e
 
=
 
a
w
a
i
t
 
c
a
l
l
G
e
m
i
n
i
A
P
I
(
t
e
x
t
)
;


 
 
 
 
 
 
 
 
a
d
d
M
e
s
s
a
g
e
(
r
e
s
p
o
n
s
e
,
 
f
a
l
s
e
)
;


 
 
 
 
 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
s
a
v
e
C
h
a
t
T
o
D
B
 
=
=
=
 
'
f
u
n
c
t
i
o
n
'
)
 
s
a
v
e
C
h
a
t
T
o
D
B
(
)
;


 
 
 
 
}
 
c
a
t
c
h
 
(
e
r
r
)
 
{


 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
e
r
r
)
;


 
 
 
 
 
 
 
 
a
d
d
M
e
s
s
a
g
e
(
"
К
р
и
т
и
ч
е
с
к
а
я
 
о
ш
и
б
к
а
 
с
к
р
и
п
т
а
.
 
П
о
д
р
о
б
н
о
с
т
и
 
в
 
к
о
н
с
о
л
и
.
"
,
 
f
a
l
s
e
)
;


 
 
 
 
}
 
f
i
n
a
l
l
y
 
{


 
 
 
 
 
 
 
 
s
e
n
d
B
t
n
.
c
l
a
s
s
L
i
s
t
.
r
e
m
o
v
e
(
'
t
h
i
n
k
i
n
g
'
)
;


 
 
 
 
 
 
 
 
s
e
n
d
B
t
n
.
i
n
n
e
r
H
T
M
L
 
=
 
'
<
i
 
d
a
t
a
-
l
u
c
i
d
e
=
"
s
e
n
d
"
>
<
/
i
>
'
;


 
 
 
 
 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
l
u
c
i
d
e
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
)
 
l
u
c
i
d
e
.
c
r
e
a
t
e
I
c
o
n
s
(
)
;


 
 
 
 
}


}




s
e
n
d
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
h
a
n
d
l
e
S
e
n
d
)
;


p
r
o
m
p
t
I
n
p
u
t
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
k
e
y
p
r
e
s
s
'
,
 
(
e
)
 
=
>
 
{


 
 
 
 
i
f
 
(
e
.
k
e
y
 
=
=
=
 
'
E
n
t
e
r
'
 
&
&
 
!
e
.
s
h
i
f
t
K
e
y
)
 
{


 
 
 
 
 
 
 
 
e
.
p
r
e
v
e
n
t
D
e
f
a
u
l
t
(
)
;


 
 
 
 
 
 
 
 
h
a
n
d
l
e
S
e
n
d
(
)
;


 
 
 
 
}


}
)
;




/
/
 
A
d
d
 
S
a
v
e
 
C
h
a
t
 
F
u
n
c
t
i
o
n
a
l
i
t
y


c
o
n
s
t
 
s
a
v
e
C
h
a
t
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
s
a
v
e
-
c
h
a
t
-
b
t
n
'
)
;


i
f
 
(
s
a
v
e
C
h
a
t
B
t
n
)
 
{


 
 
 
 
s
a
v
e
C
h
a
t
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
(
)
 
=
>
 
{


 
 
 
 
 
 
 
 
l
e
t
 
c
h
a
t
T
e
x
t
 
=
 
"
=
=
=
 
Д
и
а
л
о
г
 
с
 
A
r
d
u
i
n
o
A
I
 
=
=
=
\
n
\
n
"
;


 
 
 
 
 
 
 
 
/
/
 
S
k
i
p
 
t
h
e
 
f
i
r
s
t
 
m
e
s
s
a
g
e
 
w
h
i
c
h
 
i
s
 
t
h
e
 
s
y
s
t
e
m
 
p
r
o
m
p
t


 
 
 
 
 
 
 
 
f
o
r
 
(
l
e
t
 
i
 
=
 
1
;
 
i
 
<
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
.
l
e
n
g
t
h
;
 
i
+
+
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
s
t
 
m
s
g
 
=
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
[
i
]
;


 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
s
t
 
r
o
l
e
 
=
 
m
s
g
.
r
o
l
e
 
=
=
=
 
"
u
s
e
r
"
 
?
 
"
В
ы
"
 
:
 
"
A
r
d
u
i
n
o
A
I
"
;


 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
s
t
 
t
e
x
t
 
=
 
m
s
g
.
p
a
r
t
s
[
0
]
.
t
e
x
t
;


 
 
 
 
 
 
 
 
 
 
 
 
c
h
a
t
T
e
x
t
 
+
=
 
`
[
$
{
r
o
l
e
}
]
:
\
n
$
{
t
e
x
t
}
\
n
\
n
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
\
n
\
n
`
;


 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
c
o
n
s
t
 
b
l
o
b
 
=
 
n
e
w
 
B
l
o
b
(
[
c
h
a
t
T
e
x
t
]
,
 
{
 
t
y
p
e
:
 
'
t
e
x
t
/
p
l
a
i
n
;
c
h
a
r
s
e
t
=
u
t
f
-
8
'
 
}
)
;


 
 
 
 
 
 
 
 
c
o
n
s
t
 
u
r
l
 
=
 
U
R
L
.
c
r
e
a
t
e
O
b
j
e
c
t
U
R
L
(
b
l
o
b
)
;


 
 
 
 
 
 
 
 
c
o
n
s
t
 
a
 
=
 
d
o
c
u
m
e
n
t
.
c
r
e
a
t
e
E
l
e
m
e
n
t
(
'
a
'
)
;


 
 
 
 
 
 
 
 
a
.
h
r
e
f
 
=
 
u
r
l
;


 
 
 
 
 
 
 
 
a
.
d
o
w
n
l
o
a
d
 
=
 
`
A
r
d
u
i
n
o
_
C
h
a
t
_
$
{
n
e
w
 
D
a
t
e
(
)
.
t
o
I
S
O
S
t
r
i
n
g
(
)
.
s
l
i
c
e
(
0
,
1
0
)
}
.
t
x
t
`
;


 
 
 
 
 
 
 
 
d
o
c
u
m
e
n
t
.
b
o
d
y
.
a
p
p
e
n
d
C
h
i
l
d
(
a
)
;


 
 
 
 
 
 
 
 
a
.
c
l
i
c
k
(
)
;


 
 
 
 
 
 
 
 
d
o
c
u
m
e
n
t
.
b
o
d
y
.
r
e
m
o
v
e
C
h
i
l
d
(
a
)
;


 
 
 
 
 
 
 
 
U
R
L
.
r
e
v
o
k
e
O
b
j
e
c
t
U
R
L
(
u
r
l
)
;


 
 
 
 
}
)
;


}




/
/
 
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=


/
/
 
2
.
 
Л
О
Г
И
К
А
 
А
В
Т
О
Р
И
З
А
Ц
И
И
 
И
 
Б
А
З
Ы
 
Д
А
Н
Н
Ы
Х


/
/
 
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=
=




c
o
n
s
t
 
l
o
g
i
n
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
g
o
o
g
l
e
-
l
o
g
i
n
-
b
t
n
'
)
;


c
o
n
s
t
 
l
o
g
o
u
t
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
l
o
g
o
u
t
-
b
t
n
'
)
;


c
o
n
s
t
 
u
s
e
r
I
n
f
o
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
u
s
e
r
-
i
n
f
o
'
)
;


c
o
n
s
t
 
u
s
e
r
N
a
m
e
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
u
s
e
r
-
n
a
m
e
'
)
;


c
o
n
s
t
 
u
s
e
r
A
v
a
t
a
r
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
u
s
e
r
-
a
v
a
t
a
r
'
)
;


c
o
n
s
t
 
c
h
a
t
L
i
s
t
U
I
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
c
h
a
t
-
l
i
s
t
'
)
;


c
o
n
s
t
 
n
e
w
C
h
a
t
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
n
e
w
-
c
h
a
t
-
b
t
n
'
)
;




l
e
t
 
c
h
a
t
s
R
e
f
 
=
 
n
u
l
l
;




i
f
 
(
t
y
p
e
o
f
 
a
u
t
h
 
!
=
=
 
'
u
n
d
e
f
i
n
e
d
'
 
&
&
 
a
u
t
h
 
&
&
 
d
b
)
 
{


 
 
 
 
/
/
 
С
л
у
ш
а
е
м
 
и
з
м
е
н
е
н
и
е
 
с
т
а
т
у
с
а
 
п
о
л
ь
з
о
в
а
т
е
л
я


 
 
 
 
a
u
t
h
.
o
n
A
u
t
h
S
t
a
t
e
C
h
a
n
g
e
d
(
u
s
e
r
 
=
>
 
{


 
 
 
 
 
 
 
 
i
f
 
(
u
s
e
r
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
c
u
r
r
e
n
t
U
s
e
r
 
=
 
u
s
e
r
;


 
 
 
 
 
 
 
 
 
 
 
 
l
o
g
i
n
B
t
n
.
s
t
y
l
e
.
d
i
s
p
l
a
y
 
=
 
'
n
o
n
e
'
;


 
 
 
 
 
 
 
 
 
 
 
 
u
s
e
r
I
n
f
o
.
s
t
y
l
e
.
d
i
s
p
l
a
y
 
=
 
'
f
l
e
x
'
;


 
 
 
 
 
 
 
 
 
 
 
 
u
s
e
r
N
a
m
e
.
t
e
x
t
C
o
n
t
e
n
t
 
=
 
u
s
e
r
.
d
i
s
p
l
a
y
N
a
m
e
;


 
 
 
 
 
 
 
 
 
 
 
 
u
s
e
r
A
v
a
t
a
r
.
s
r
c
 
=
 
u
s
e
r
.
p
h
o
t
o
U
R
L
;


 
 
 
 
 
 
 
 
 
 
 
 
l
o
a
d
C
h
a
t
s
F
r
o
m
D
B
(
)
;


 
 
 
 
 
 
 
 
}
 
e
l
s
e
 
{


 
 
 
 
 
 
 
 
 
 
 
 
c
u
r
r
e
n
t
U
s
e
r
 
=
 
n
u
l
l
;


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
c
h
a
t
s
R
e
f
)
 
c
h
a
t
s
R
e
f
.
o
f
f
(
)
;


 
 
 
 
 
 
 
 
 
 
 
 
l
o
g
i
n
B
t
n
.
s
t
y
l
e
.
d
i
s
p
l
a
y
 
=
 
'
b
l
o
c
k
'
;


 
 
 
 
 
 
 
 
 
 
 
 
u
s
e
r
I
n
f
o
.
s
t
y
l
e
.
d
i
s
p
l
a
y
 
=
 
'
n
o
n
e
'
;


 
 
 
 
 
 
 
 
 
 
 
 
c
h
a
t
L
i
s
t
U
I
.
i
n
n
e
r
H
T
M
L
 
=
 
'
<
d
i
v
 
s
t
y
l
e
=
"
p
a
d
d
i
n
g
:
 
2
0
p
x
;
 
t
e
x
t
-
a
l
i
g
n
:
 
c
e
n
t
e
r
;
 
c
o
l
o
r
:
 
v
a
r
(
-
-
t
e
x
t
-
s
e
c
o
n
d
a
r
y
)
;
 
f
o
n
t
-
s
i
z
e
:
 
0
.
9
r
e
m
;
"
>
В
о
й
д
и
т
е
,
 
ч
т
о
б
ы
 
с
о
х
р
а
н
я
т
ь
 
и
с
т
о
р
и
ю
<
/
d
i
v
>
'
;


 
 
 
 
 
 
 
 
}


 
 
 
 
}
)
;




 
 
 
 
/
/
 
К
н
о
п
к
а
 
в
х
о
д
а


 
 
 
 
l
o
g
i
n
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
(
)
 
=
>
 
{


 
 
 
 
 
 
 
 
c
o
n
s
t
 
p
r
o
v
i
d
e
r
 
=
 
n
e
w
 
f
i
r
e
b
a
s
e
.
a
u
t
h
.
G
o
o
g
l
e
A
u
t
h
P
r
o
v
i
d
e
r
(
)
;


 
 
 
 
 
 
 
 
a
u
t
h
.
s
i
g
n
I
n
W
i
t
h
P
o
p
u
p
(
p
r
o
v
i
d
e
r
)
.
c
a
t
c
h
(
e
r
r
o
r
 
=
>
 
{


 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
"
A
u
t
h
 
e
r
r
o
r
:
"
,
 
e
r
r
o
r
)
;


 
 
 
 
 
 
 
 
 
 
 
 
a
l
e
r
t
(
"
О
ш
и
б
к
а
 
в
х
о
д
а
:
 
"
 
+
 
e
r
r
o
r
.
m
e
s
s
a
g
e
 
+
 
"
\
n
\
n
(
В
о
з
м
о
ж
н
о
,
 
в
 
F
i
r
e
b
a
s
e
 
н
е
 
в
к
л
ю
ч
е
н
 
п
р
о
в
а
й
д
е
р
 
G
o
o
g
l
e
 
и
л
и
 
д
о
м
е
н
 
н
е
 
д
о
б
а
в
л
е
н
 
в
 
р
а
з
р
е
ш
е
н
н
ы
е
)
"
)
;


 
 
 
 
 
 
 
 
}
)
;


 
 
 
 
}
)
;




 
 
 
 
/
/
 
К
н
о
п
к
а
 
в
ы
х
о
д
а


 
 
 
 
l
o
g
o
u
t
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
(
)
 
=
>
 
{


 
 
 
 
 
 
 
 
a
u
t
h
.
s
i
g
n
O
u
t
(
)
;


 
 
 
 
 
 
 
 
s
t
a
r
t
N
e
w
C
h
a
t
(
)
;


 
 
 
 
}
)
;


}
 
e
l
s
e
 
i
f
 
(
l
o
g
i
n
B
t
n
)
 
{


 
 
 
 
l
o
g
i
n
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
(
)
 
=
>
 
a
l
e
r
t
(
"
В
с
т
а
в
ь
т
е
 
f
i
r
e
b
a
s
e
C
o
n
f
i
g
 
в
 
к
о
д
,
 
ч
т
о
б
ы
 
р
а
б
о
т
а
л
а
 
а
в
т
о
р
и
з
а
ц
и
я
!
"
)
)
;


}




/
/
 
С
о
з
д
а
н
и
е
 
н
о
в
о
г
о
 
ч
а
т
а


i
f
 
(
n
e
w
C
h
a
t
B
t
n
)
 
{


 
 
 
 
n
e
w
C
h
a
t
B
t
n
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
c
l
i
c
k
'
,
 
s
t
a
r
t
N
e
w
C
h
a
t
)
;


}




f
u
n
c
t
i
o
n
 
s
t
a
r
t
N
e
w
C
h
a
t
(
)
 
{


 
 
 
 
c
u
r
r
e
n
t
C
h
a
t
I
d
 
=
 
D
a
t
e
.
n
o
w
(
)
.
t
o
S
t
r
i
n
g
(
)
;


 
 
 
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
 
=
 
[


 
 
 
 
 
 
 
 
{
 
r
o
l
e
:
 
"
u
s
e
r
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
S
Y
S
T
E
M
_
P
R
O
M
P
T
 
}
]
 
}
,


 
 
 
 
 
 
 
 
{
 
r
o
l
e
:
 
"
m
o
d
e
l
"
,
 
p
a
r
t
s
:
 
[
{
 
t
e
x
t
:
 
"
П
о
н
я
л
.
 
Я
 
г
о
т
о
в
 
п
о
м
о
г
а
т
ь
 
с
 
A
r
d
u
i
n
o
 
к
о
д
о
м
!
"
 
}
]
 
}


 
 
 
 
]
;


 
 
 
 
c
h
a
t
H
i
s
t
o
r
y
.
i
n
n
e
r
H
T
M
L
 
=
 
`


 
 
 
 
 
 
 
 
<
d
i
v
 
c
l
a
s
s
=
"
c
h
a
t
-
m
e
s
s
a
g
e
 
a
i
-
m
e
s
s
a
g
e
"
>


 
 
 
 
 
 
 
 
 
 
 
 
<
d
i
v
 
c
l
a
s
s
=
"
m
e
s
s
a
g
e
-
c
o
n
t
e
n
t
"
>
П
р
и
в
е
т
!
 
Я
 
т
в
о
й
 
И
И
-
п
о
м
о
щ
н
и
к
 
д
л
я
 
A
r
d
u
i
n
o
.
 
Н
а
п
и
ш
и
,
 
ч
т
о
 
т
ы
 
х
о
ч
е
ш
ь
 
с
о
з
д
а
т
ь
,
 
и
 
я
 
с
г
е
н
е
р
и
р
у
ю
 
к
о
д
!
<
/
d
i
v
>


 
 
 
 
 
 
 
 
<
/
d
i
v
>


 
 
 
 
`
;


 
 
 
 
i
f
 
(
e
d
i
t
o
r
)
 
e
d
i
t
o
r
.
s
e
t
V
a
l
u
e
(
"
/
/
 
В
а
ш
 
к
о
д
 
п
о
я
в
и
т
с
я
 
з
д
е
с
ь
\
n
v
o
i
d
 
s
e
t
u
p
(
)
 
{
\
n
 
 
\
n
}
\
n
\
n
v
o
i
d
 
l
o
o
p
(
)
 
{
\
n
 
 
\
n
}
"
)
;


 
 
 
 
i
f
 
(
t
y
p
e
o
f
 
s
a
v
e
C
h
a
t
T
o
D
B
 
=
=
=
 
'
f
u
n
c
t
i
o
n
'
)
 
s
a
v
e
C
h
a
t
T
o
D
B
(
)
;


 
 
 
 
l
o
a
d
C
h
a
t
s
F
r
o
m
D
B
(
)
;
 
/
/
 
О
б
н
о
в
и
т
 
с
п
и
с
о
к
 
д
и
а
л
о
г
о
в


}




/
/
 
Ф
у
н
к
ц
и
я
 
д
л
я
 
с
о
х
р
а
н
е
н
и
я
 
т
е
к
у
щ
е
г
о
 
ч
а
т
а
 
в
 
R
T
D
B


a
s
y
n
c
 
f
u
n
c
t
i
o
n
 
s
a
v
e
C
h
a
t
T
o
D
B
(
)
 
{


 
 
 
 
i
f
 
(
!
c
u
r
r
e
n
t
U
s
e
r
 
|
|
 
t
y
p
e
o
f
 
d
b
 
=
=
=
 
'
u
n
d
e
f
i
n
e
d
'
 
|
|
 
!
d
b
)
 
r
e
t
u
r
n
;


 
 
 
 


 
 
 
 
/
/
 
Г
е
н
е
р
и
р
у
е
м
 
к
о
р
о
т
к
о
е
 
н
а
з
в
а
н
и
е
 
ч
а
т
а
 
и
з
 
п
е
р
в
о
г
о
 
з
а
п
р
о
с
а
 
п
о
л
ь
з
о
в
а
т
е
л
я


 
 
 
 
l
e
t
 
t
i
t
l
e
 
=
 
"
Н
о
в
ы
й
 
д
и
а
л
о
г
"
;


 
 
 
 
i
f
 
(
m
e
s
s
a
g
e
H
i
s
t
o
r
y
.
l
e
n
g
t
h
 
>
 
2
)
 
{


 
 
 
 
 
 
 
 
t
i
t
l
e
 
=
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y
[
2
]
.
p
a
r
t
s
[
0
]
.
t
e
x
t
.
s
u
b
s
t
r
i
n
g
(
0
,
 
3
0
)
;


 
 
 
 
 
 
 
 
i
f
 
(
m
e
s
s
a
g
e
H
i
s
t
o
r
y
[
2
]
.
p
a
r
t
s
[
0
]
.
t
e
x
t
.
l
e
n
g
t
h
 
>
 
3
0
)
 
t
i
t
l
e
 
+
=
 
"
.
.
.
"
;


 
 
 
 
}




 
 
 
 
t
r
y
 
{


 
 
 
 
 
 
 
 
a
w
a
i
t
 
d
b
.
r
e
f
(
'
u
s
e
r
s
/
'
 
+
 
c
u
r
r
e
n
t
U
s
e
r
.
u
i
d
 
+
 
'
/
c
h
a
t
s
/
'
 
+
 
c
u
r
r
e
n
t
C
h
a
t
I
d
)
.
s
e
t
(
{


 
 
 
 
 
 
 
 
 
 
 
 
t
i
t
l
e
:
 
t
i
t
l
e
,


 
 
 
 
 
 
 
 
 
 
 
 
u
p
d
a
t
e
d
A
t
:
 
f
i
r
e
b
a
s
e
.
d
a
t
a
b
a
s
e
.
S
e
r
v
e
r
V
a
l
u
e
.
T
I
M
E
S
T
A
M
P
,


 
 
 
 
 
 
 
 
 
 
 
 
m
e
s
s
a
g
e
s
:
 
m
e
s
s
a
g
e
H
i
s
t
o
r
y


 
 
 
 
 
 
 
 
}
)
;


 
 
 
 
}
 
c
a
t
c
h
 
(
e
)
 
{


 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
"
E
r
r
o
r
 
s
a
v
i
n
g
 
c
h
a
t
:
"
,
 
e
)
;


 
 
 
 
}


}




/
/
 
Ф
у
н
к
ц
и
я
 
д
л
я
 
з
а
г
р
у
з
к
и
 
с
п
и
с
к
а
 
ч
а
т
о
в
 
и
з
 
R
T
D
B
 
(
R
e
a
l
t
i
m
e
)


l
e
t
 
a
l
l
L
o
a
d
e
d
C
h
a
t
s
 
=
 
[
]
;


c
o
n
s
t
 
s
e
a
r
c
h
C
h
a
t
I
n
p
u
t
 
=
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
'
s
e
a
r
c
h
-
c
h
a
t
-
i
n
p
u
t
'
)
;


i
f
 
(
s
e
a
r
c
h
C
h
a
t
I
n
p
u
t
)
 
{


 
 
 
 
s
e
a
r
c
h
C
h
a
t
I
n
p
u
t
.
a
d
d
E
v
e
n
t
L
i
s
t
e
n
e
r
(
'
i
n
p
u
t
'
,
 
(
)
 
=
>
 
{


 
 
 
 
 
 
 
 
r
e
n
d
e
r
C
h
a
t
L
i
s
t
(
a
l
l
L
o
a
d
e
d
C
h
a
t
s
)
;


 
 
 
 
}
)
;


}




f
u
n
c
t
i
o
n
 
r
e
n
d
e
r
C
h
a
t
L
i
s
t
(
c
h
a
t
s
)
 
{


 
 
 
 
c
h
a
t
L
i
s
t
U
I
.
i
n
n
e
r
H
T
M
L
 
=
 
'
'
;


 
 
 
 


 
 
 
 
i
f
 
(
c
h
a
t
s
.
l
e
n
g
t
h
 
=
=
=
 
0
)
 
{


 
 
 
 
 
 
 
 
c
h
a
t
L
i
s
t
U
I
.
i
n
n
e
r
H
T
M
L
 
=
 
'
<
d
i
v
 
s
t
y
l
e
=
"
p
a
d
d
i
n
g
:
 
2
0
p
x
;
 
t
e
x
t
-
a
l
i
g
n
:
 
c
e
n
t
e
r
;
 
c
o
l
o
r
:
 
v
a
r
(
-
-
t
e
x
t
-
s
e
c
o
n
d
a
r
y
)
;
 
f
o
n
t
-
s
i
z
e
:
 
0
.
9
r
e
m
;
"
>
У
 
в
а
с
 
п
о
к
а
 
н
е
т
 
д
и
а
л
о
г
о
в
<
/
d
i
v
>
'
;


 
 
 
 
 
 
 
 
r
e
t
u
r
n
;


 
 
 
 
}




 
 
 
 
c
o
n
s
t
 
s
e
a
r
c
h
T
e
r
m
 
=
 
s
e
a
r
c
h
C
h
a
t
I
n
p
u
t
 
?
 
s
e
a
r
c
h
C
h
a
t
I
n
p
u
t
.
v
a
l
u
e
.
t
o
L
o
w
e
r
C
a
s
e
(
)
 
:
 
"
"
;




 
 
 
 
l
e
t
 
m
a
t
c
h
C
o
u
n
t
 
=
 
0
;




 
 
 
 
c
h
a
t
s
.
f
o
r
E
a
c
h
(
d
a
t
a
 
=
>
 
{


 
 
 
 
 
 
 
 
i
f
 
(
s
e
a
r
c
h
T
e
r
m
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
l
e
t
 
m
a
t
c
h
 
=
 
f
a
l
s
e
;


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
d
a
t
a
.
t
i
t
l
e
 
&
&
 
d
a
t
a
.
t
i
t
l
e
.
t
o
L
o
w
e
r
C
a
s
e
(
)
.
i
n
c
l
u
d
e
s
(
s
e
a
r
c
h
T
e
r
m
)
)
 
m
a
t
c
h
 
=
 
t
r
u
e
;


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
d
a
t
a
.
m
e
s
s
a
g
e
s
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
f
o
r
 
(
l
e
t
 
m
s
g
 
o
f
 
d
a
t
a
.
m
e
s
s
a
g
e
s
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
m
s
g
.
p
a
r
t
s
 
&
&
 
m
s
g
.
p
a
r
t
s
[
0
]
 
&
&
 
m
s
g
.
p
a
r
t
s
[
0
]
.
t
e
x
t
.
t
o
L
o
w
e
r
C
a
s
e
(
)
.
i
n
c
l
u
d
e
s
(
s
e
a
r
c
h
T
e
r
m
)
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
m
a
t
c
h
 
=
 
t
r
u
e
;


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
b
r
e
a
k
;


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
!
m
a
t
c
h
)
 
r
e
t
u
r
n
;


 
 
 
 
 
 
 
 
}




 
 
 
 
 
 
 
 
m
a
t
c
h
C
o
u
n
t
+
+
;




 
 
 
 
 
 
 
 
c
o
n
s
t
 
w
r
a
p
p
e
r
 
=
 
d
o
c
u
m
e
n
t
.
c
r
e
a
t
e
E
l
e
m
e
n
t
(
'
d
i
v
'
)
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
c
l
a
s
s
N
a
m
e
 
=
 
\
c
h
a
t
-
i
t
e
m
 
\
 
+
 
(
d
a
t
a
.
i
d
 
=
=
=
 
c
u
r
r
e
n
t
C
h
a
t
I
d
 
?
 
'
a
c
t
i
v
e
'
 
:
 
'
'
)
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
s
t
y
l
e
.
d
i
s
p
l
a
y
 
=
 
'
f
l
e
x
'
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
s
t
y
l
e
.
j
u
s
t
i
f
y
C
o
n
t
e
n
t
 
=
 
'
s
p
a
c
e
-
b
e
t
w
e
e
n
'
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
s
t
y
l
e
.
a
l
i
g
n
I
t
e
m
s
 
=
 
'
c
e
n
t
e
r
'
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
s
t
y
l
e
.
p
a
d
d
i
n
g
R
i
g
h
t
 
=
 
'
1
0
p
x
'
;




 
 
 
 
 
 
 
 
c
o
n
s
t
 
t
i
t
l
e
S
p
a
n
 
=
 
d
o
c
u
m
e
n
t
.
c
r
e
a
t
e
E
l
e
m
e
n
t
(
'
s
p
a
n
'
)
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
t
e
x
t
C
o
n
t
e
n
t
 
=
 
d
a
t
a
.
t
i
t
l
e
 
|
|
 
"
Д
и
а
л
о
г
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
s
t
y
l
e
.
f
l
e
x
 
=
 
"
1
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
s
t
y
l
e
.
o
v
e
r
f
l
o
w
 
=
 
"
h
i
d
d
e
n
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
s
t
y
l
e
.
t
e
x
t
O
v
e
r
f
l
o
w
 
=
 
"
e
l
l
i
p
s
i
s
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
s
t
y
l
e
.
w
h
i
t
e
S
p
a
c
e
 
=
 
"
n
o
w
r
a
p
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
t
i
t
l
e
 
=
 
"
Д
в
о
й
н
о
й
 
к
л
и
к
 
ч
т
о
б
ы
 
п
е
р
е
и
м
е
н
о
в
а
т
ь
"
;


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
s
t
y
l
e
.
c
u
r
s
o
r
 
=
 
"
t
e
x
t
"
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
t
i
t
l
e
S
p
a
n
.
o
n
d
b
l
c
l
i
c
k
 
=
 
a
s
y
n
c
 
(
e
)
 
=
>
 
{


 
 
 
 
 
 
 
 
 
 
 
 
e
.
s
t
o
p
P
r
o
p
a
g
a
t
i
o
n
(
)
;


 
 
 
 
 
 
 
 
 
 
 
 
c
o
n
s
t
 
n
e
w
T
i
t
l
e
 
=
 
p
r
o
m
p
t
(
"
В
в
е
д
и
т
е
 
н
о
в
о
е
 
н
а
з
в
а
н
и
е
 
д
и
а
л
о
г
а
:
"
,
 
d
a
t
a
.
t
i
t
l
e
 
|
|
 
"
Д
и
а
л
о
г
"
)
;


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
n
e
w
T
i
t
l
e
 
!
=
=
 
n
u
l
l
 
&
&
 
n
e
w
T
i
t
l
e
.
t
r
i
m
(
)
 
!
=
=
 
"
"
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
a
w
a
i
t
 
d
b
.
r
e
f
(
'
u
s
e
r
s
/
'
 
+
 
c
u
r
r
e
n
t
U
s
e
r
.
u
i
d
 
+
 
'
/
c
h
a
t
s
/
'
 
+
 
d
a
t
a
.
i
d
)
.
u
p
d
a
t
e
(
{
 
t
i
t
l
e
:
 
n
e
w
T
i
t
l
e
.
t
r
i
m
(
)
 
}
)
;


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
}
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
o
n
c
l
i
c
k
 
=
 
(
)
 
=
>
 
l
o
a
d
S
p
e
c
i
f
i
c
C
h
a
t
(
d
a
t
a
.
i
d
,
 
d
a
t
a
.
m
e
s
s
a
g
e
s
)
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
c
o
n
s
t
 
d
e
l
B
t
n
 
=
 
d
o
c
u
m
e
n
t
.
c
r
e
a
t
e
E
l
e
m
e
n
t
(
'
b
u
t
t
o
n
'
)
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
i
n
n
e
r
H
T
M
L
 
=
 
'
✕
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
b
a
c
k
g
r
o
u
n
d
 
=
 
'
n
o
n
e
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
b
o
r
d
e
r
 
=
 
'
n
o
n
e
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
c
o
l
o
r
 
=
 
'
v
a
r
(
-
-
t
e
x
t
-
s
e
c
o
n
d
a
r
y
)
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
c
u
r
s
o
r
 
=
 
'
p
o
i
n
t
e
r
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
p
a
d
d
i
n
g
 
=
 
'
0
 
5
p
x
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
s
t
y
l
e
.
f
o
n
t
S
i
z
e
 
=
 
'
1
4
p
x
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
t
i
t
l
e
 
=
 
"
У
д
а
л
и
т
ь
 
ч
а
т
"
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
o
n
c
l
i
c
k
 
=
 
a
s
y
n
c
 
(
e
)
 
=
>
 
{


 
 
 
 
 
 
 
 
 
 
 
 
e
.
s
t
o
p
P
r
o
p
a
g
a
t
i
o
n
(
)
;


 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
c
o
n
f
i
r
m
(
"
Т
о
ч
н
о
 
у
д
а
л
и
т
ь
 
э
т
о
т
 
д
и
а
л
о
г
?
"
)
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
a
w
a
i
t
 
d
b
.
r
e
f
(
'
u
s
e
r
s
/
'
 
+
 
c
u
r
r
e
n
t
U
s
e
r
.
u
i
d
 
+
 
'
/
c
h
a
t
s
/
'
 
+
 
d
a
t
a
.
i
d
)
.
r
e
m
o
v
e
(
)
;


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
i
f
 
(
d
a
t
a
.
i
d
 
=
=
=
 
c
u
r
r
e
n
t
C
h
a
t
I
d
)
 
s
t
a
r
t
N
e
w
C
h
a
t
(
)
;


 
 
 
 
 
 
 
 
 
 
 
 
}


 
 
 
 
 
 
 
 
}
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
o
n
m
o
u
s
e
o
v
e
r
 
=
 
(
)
 
=
>
 
d
e
l
B
t
n
.
s
t
y
l
e
.
c
o
l
o
r
 
=
 
'
#
e
f
4
4
4
4
'
;


 
 
 
 
 
 
 
 
d
e
l
B
t
n
.
o
n
m
o
u
s
e
o
u
t
 
=
 
(
)
 
=
>
 
d
e
l
B
t
n
.
s
t
y
l
e
.
c
o
l
o
r
 
=
 
'
v
a
r
(
-
-
t
e
x
t
-
s
e
c
o
n
d
a
r
y
)
'
;




 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
a
p
p
e
n
d
C
h
i
l
d
(
t
i
t
l
e
S
p
a
n
)
;


 
 
 
 
 
 
 
 
w
r
a
p
p
e
r
.
a
p
p
e
n
d
C
h
i
l
d
(
d
e
l
B
t
n
)
;


 
 
 
 
 
 
 
 
c
h
a
t
L
i
s
t
U
I
.
a
p
p
e
n
d
C
h
i
l
d
(
w
r
a
p
p
e
r
)
;


 
 
 
 
}
)
;




 
 
 
 
i
f
 
(
m
a
t
c
h
C
o
u
n
t
 
=
=
=
 
0
 
&
&
 
s
e
a
r
c
h
T
e
r
m
)
 
{


 
 
 
 
 
 
 
 
c
h
a
t
L
i
s
t
U
I
.
i
n
n
e
r
H
T
M
L
 
=
 
'
<
d
i
v
 
s
t
y
l
e
=
"
p
a
d
d
i
n
g
:
 
2
0
p
x
;
 
t
e
x
t
-
a
l
i
g
n
:
 
c
e
n
t
e
r
;
 
c
o
l
o
r
:
 
v
a
r
(
-
-
t
e
x
t
-
s
e
c
o
n
d
a
r
y
)
;
 
f
o
n
t
-
s
i
z
e
:
 
0
.
9
r
e
m
;
"
>
Н
и
ч
е
г
о
 
н
е
 
н
а
й
д
е
н
о
<
/
d
i
v
>
'
;


 
 
 
 
}


}




f
u
n
c
t
i
o
n
 
l
o
a
d
C
h
a
t
s
F
r
o
m
D
B
(
)
 
{


 
 
 
 
i
f
 
(
!
c
u
r
r
e
n
t
U
s
e
r
 
|
|
 
t
y
p
e
o
f
 
d
b
 
=
=
=
 
'
u
n
d
e
f
i
n
e
d
'
 
|
|
 
!
d
b
)
 
r
e
t
u
r
n
;


 
 
 
 


 
 
 
 
i
f
 
(
c
h
a
t
s
R
e
f
)
 
c
h
a
t
s
R
e
f
.
o
f
f
(
)
;


 
 
 
 
c
h
a
t
s
R
e
f
 
=
 
d
b
.
r
e
f
(
'
u
s
e
r
s
/
'
 
+
 
c
u
r
r
e
n
t
U
s
e
r
.
u
i
d
 
+
 
'
/
c
h
a
t
s
'
)
;


 
 
 
 


 
 
 
 
c
h
a
t
s
R
e
f
.
o
r
d
e
r
B
y
C
h
i
l
d
(
'
u
p
d
a
t
e
d
A
t
'
)
.
o
n
(
'
v
a
l
u
e
'
,
 
(
s
n
a
p
s
h
o
t
)
 
=
>
 
{


 
 
 
 
 
 
 
 
a
l
l
L
o
a
d
e
d
C
h
a
t
s
 
=
 
[
]
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
i
f
 
(
!
s
n
a
p
s
h
o
t
.
e
x
i
s
t
s
(
)
)
 
{


 
 
 
 
 
 
 
 
 
 
 
 
r
e
n
d
e
r
C
h
a
t
L
i
s
t
(
a
l
l
L
o
a
d
e
d
C
h
a
t
s
)
;


 
 
 
 
 
 
 
 
 
 
 
 
r
e
t
u
r
n
;


 
 
 
 
 
 
 
 
}




 
 
 
 
 
 
 
 
s
n
a
p
s
h
o
t
.
f
o
r
E
a
c
h
(
c
h
i
l
d
S
n
a
p
s
h
o
t
 
=
>
 
{


 
 
 
 
 
 
 
 
 
 
 
 
a
l
l
L
o
a
d
e
d
C
h
a
t
s
.
p
u
s
h
(
{
 
i
d
:
 
c
h
i
l
d
S
n
a
p
s
h
o
t
.
k
e
y
,
 
.
.
.
c
h
i
l
d
S
n
a
p
s
h
o
t
.
v
a
l
(
)
 
}
)
;


 
 
 
 
 
 
 
 
}
)
;


 
 
 
 
 
 
 
 


 
 
 
 
 
 
 
 
a
l
l
L
o
a
d
e
d
C
h
a
t
s
.
r
e
v
e
r
s
e
(
)
;


 
 
 
 
 
 
 
 
r
e
n
d
e
r
C
h
a
t
L
i
s
t
(
a
l
l
L
o
a
d
e
d
C
h
a
t
s
)
;


 
 
 
 
}
,
 
(
e
r
r
o
r
)
 
=
>
 
{


 
 
 
 
 
 
 
 
c
o
n
s
o
l
e
.
e
r
r
o
r
(
"
E
r
r
o
r
 
l
o
a
d
i
n
g
 
c
h
a
t
s
:
"
,
 
e
r
r
o
r
)
;


 
 
 
 
}
)
;


}

