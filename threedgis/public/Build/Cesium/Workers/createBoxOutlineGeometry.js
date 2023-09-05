define(["./arrayFill-4513d7ad","./buildModuleUrl-4e1b81e7","./Cartographic-3309dd0d","./Check-7b2a090c","./ComponentDatatype-c140a87d","./when-b60132fc","./GeometryAttribute-3a88ba31","./GeometryAttributes-252e9929","./GeometryOffsetAttribute-fbeb6f1a","./PrimitiveType-a54dc62f","./Cartesian2-47311507","./Math-119be1a3","./Event-16a2dfbf","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./FeatureDetection-c3b71206","./Cartesian4-3ca25aab"],(function(e,t,a,n,i,r,u,o,m,s,f,c,d,b,l,p,y){"use strict";var C=new a.Cartesian3;function A(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).minimum,n=e.maximum;this._min=a.Cartesian3.clone(t),this._max=a.Cartesian3.clone(n),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}A.fromDimensions=function(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).dimensions,n=a.Cartesian3.multiplyByScalar(t,.5,new a.Cartesian3);return new A({minimum:a.Cartesian3.negate(n,new a.Cartesian3),maximum:n,offsetAttribute:e.offsetAttribute})},A.fromAxisAlignedBoundingBox=function(e){return new A({minimum:e.minimum,maximum:e.maximum})},A.packedLength=2*a.Cartesian3.packedLength+1,A.pack=function(e,t,n){return n=r.defaultValue(n,0),a.Cartesian3.pack(e._min,t,n),a.Cartesian3.pack(e._max,t,n+a.Cartesian3.packedLength),t[n+2*a.Cartesian3.packedLength]=r.defaultValue(e._offsetAttribute,-1),t};var x=new a.Cartesian3,_=new a.Cartesian3,v={minimum:x,maximum:_,offsetAttribute:void 0};return A.unpack=function(e,t,n){t=r.defaultValue(t,0);var i=a.Cartesian3.unpack(e,t,x),u=a.Cartesian3.unpack(e,t+a.Cartesian3.packedLength,_),o=e[t+2*a.Cartesian3.packedLength];return r.defined(n)?(n._min=a.Cartesian3.clone(i,n._min),n._max=a.Cartesian3.clone(u,n._max),n._offsetAttribute=-1===o?void 0:o,n):(v.offsetAttribute=-1===o?void 0:o,new A(v))},A.createGeometry=function(n){var f=n._min,c=n._max;if(!a.Cartesian3.equals(f,c)){var d=new o.GeometryAttributes,b=new Uint16Array(24),l=new Float64Array(24);l[0]=f.x,l[1]=f.y,l[2]=f.z,l[3]=c.x,l[4]=f.y,l[5]=f.z,l[6]=c.x,l[7]=c.y,l[8]=f.z,l[9]=f.x,l[10]=c.y,l[11]=f.z,l[12]=f.x,l[13]=f.y,l[14]=c.z,l[15]=c.x,l[16]=f.y,l[17]=c.z,l[18]=c.x,l[19]=c.y,l[20]=c.z,l[21]=f.x,l[22]=c.y,l[23]=c.z,d.position=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l}),b[0]=4,b[1]=5,b[2]=5,b[3]=6,b[4]=6,b[5]=7,b[6]=7,b[7]=4,b[8]=0,b[9]=1,b[10]=1,b[11]=2,b[12]=2,b[13]=3,b[14]=3,b[15]=0,b[16]=0,b[17]=4,b[18]=1,b[19]=5,b[20]=2,b[21]=6,b[22]=3,b[23]=7;var p=a.Cartesian3.subtract(c,f,C),y=.5*a.Cartesian3.magnitude(p);if(r.defined(n._offsetAttribute)){var A=l.length,x=new Uint8Array(A/3),_=n._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(x,_),d.applyOffset=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})}return new u.Geometry({attributes:d,indices:b,primitiveType:s.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(a.Cartesian3.ZERO,y),offsetAttribute:n._offsetAttribute})}},function(e,t){return r.defined(t)&&(e=A.unpack(e,t)),A.createGeometry(e)}}));
