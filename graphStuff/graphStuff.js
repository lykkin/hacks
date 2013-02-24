var Graph = function(isDirected, isWeighted) {

  if(typeof isDirected != 'boolean'){
    console.log('invalid directed type, defaulted to false');
    isDirected = false;
  }
  
  if(typeof isWeighted != 'boolean'){
    console.log('invalid weighted type, defaulted to false');
    isWeighted = false;
  }
  
  return {
    directed:isDirected,
    weighted:isWeighted,
    nodes:[], //nodes[index]::{value, [edges]}  edge[connectedTo]::weight
    
    addNode:function(value, connectedTo){
      var index = this.nodes.push({value:value, connectedTo:connectedTo});
      if(!directed){
        for(edge in connectedTo){
          var node = this.nodes[edge];
          node.edges[index] = connectedTo[edge];
        }
      }
    },
    
    addEdge:function(from, to, weight){
      if(this.nodes[from] == undefined){
        console.log('error adding edge, no node ' + from);
        return this;
      }
      
      if(this.nodes[to] == undefined){
        console.log('error adding edge, no node ' + to);
        return this;
      }

      if(!this.weighted){
        weight = 1;
      }
      
      if(this.nodes[from].edges[to] != undefined){
        this.nodes[from].edges[to] = weight;
      } else {
        console.log('unable to add edge, already exists.');
        return this;
      }

      if(!directed){
        this.nodes[to].edges[from] = weight;
      }
      return this;
      
    },

    deleteEdge:function(from, to){
      if(this.nodes[from] == undefined){
        console.log('error deleting edge, no node ' + from);
        return this;
      }

      if(this.nodes[to] == undefined){
        console.log('error deleting edge, no node ' + to);
        return this;
      }

      this.nodes[from].edges[to] = undefined;
      
      if(!directed){
        this.nodes[to].edges[from] = undefined;
      }
      return this;
    },

    updateEdge:function(from, to, weight){
      if(!weighted){
        console.log("can't update unweighted graphs.");
        return this;
      }

      if(this.nodes[from] == undefined){
        console.log('error updating edge, no node ' + from);
        return this;
      }

      if(this.nodes[to] == undefined){
        console.log('error updating edge, no node ' + to);
        return this;
      }

      this.nodes[from].edges[to] = weight;
      
      if(!directed){
        this.nodes[to].edges[from] = weight;
      }
      return this;
    },

    depthFirstMap:function(node, fn){
      fn(node);
      node.visited = true;
      for(connectedIndex in node.edges){
        if(!this.nodes[connectedIndex].visited){
          depthFirstMap(this.nodes[connectedIndex]);
        }
      }
      return this;
    },

    isConnected:function(){
      var countingGraph = this.cloneGraph();
      countingGraph.counter = 0;
      countingGraph.depthFirstMap(countingGraph.nodes[0], function(node){
        if(!node.counted){
          this.counter++;
        }
        node.counted = true;
      }).block(function(){
        return countingGraph.counter == countingGraph.nodes.length;
        });
    },

    block:function(fn){
      return fn.apply(this, Array.prototype.slice.call(arguments, 1));
    },
    
    createCompleteNGraph: function(n, directed, weighted){
      var result = Graph(directed, weighted);
      for(var i = 0; i < n; i++){
        var edges = [];
        for(var j = (this.directed ? 0 : i + 1); j < n; j++){
          if(i != j){
            edges[j] = (weighted ? Math.floor(Math.random() * 99 + 1) : 1);
          } else {
            edges[j] = undefined;
          }
        }
        result.nodes.push({value:i, connectedTo: edges});
      }
      return result;
    },
    
    cloneGraph: function(){
      var newGraph = Graph(this.directed, this.weighted);
      
      for(node in this.nodes){
        var currentNode = this.nodes[node];
        newGraph.addNode(currentNode.value, currentNode.connectedTo); 
      }

      return newGraph;
     
    }
    
 };
   
};

