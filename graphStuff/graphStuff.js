var Graph = function(isDirected, isWeighted) {

  if(typeof isDirected != 'boolean'){
    console.warn('Invalid directed type, defaulted to false');
    isDirected = false;
  }
  
  if(typeof isWeighted != 'boolean'){
    console.warn('Invalid weighted type, defaulted to false');
    isWeighted = false;
  }
  
  return {
    directed:isDirected,
    weighted:isWeighted,
    nodes:[], //nodes[index]::{value, [edges]}  edge[connectedTo]::weight
    
    addNode:function(value, connectedTo){
      var index = this.nodes.push({value:value, connectedTo:connectedTo});
      if(!this.directed){
        for(edge in connectedTo){
          var node = this.nodes[edge];
          node.connectedTo[index] = connectedTo[edge];
        }
      }
    },
    
    addEdge:function(from, to, weight){
      if(from == to && weight != undefined){
        console.warn("Attempting to assign a loop");
        this.nodes[from].connectedTo[from] = undefined;
        return this;
      }
      if(this.nodes[from] == undefined){
        console.error('Error adding edge, no node ' + from);
        return this;
      }
      
      if(this.nodes[to] == undefined){
        console.error('Error adding edge, no node ' + to);
        return this;
      }

      if(!this.weighted && weight != undefined){
        weight = 1;
      }
      
      if(this.nodes[from].connectedTo[to] == undefined){
        this.nodes[from].connectedTo[to] = weight;
      } else {
        console.warn('Unable to add edge, already exists.');
        return this;
      }

      if(!this.directed){
        this.nodes[to].connectedTo[from] = weight;
      }
      return this;
      
    },

    deleteEdge:function(from, to){
      if(this.nodes[from] == undefined){
        console.error('Error deleting edge, no node ' + from);
        return this;
      }

      if(this.nodes[to] == undefined){
        console.error('Error deleting edge, no node ' + to);
        return this;
      }

      this.nodes[from].connectedTo[to] = undefined;
      
      if(!this.directed){
        this.nodes[to].connectedTo[from] = undefined;
      }
      return this;
    },

    updateEdge:function(from, to, weight){
      if(!this.weighted){
        console.error("Can't update weights on unweighted graphs.");
        return this;
      }

      if(this.nodes[from] == undefined){
        console.error('Error updating edge, no node ' + from);
        return this;
      }

      if(this.nodes[to] == undefined){
        console.error('Error updating edge, no node ' + to);
        return this;
      }

      this.nodes[from].connectedTo[to] = weight;
      
      if(!this.directed){
        this.nodes[to].connectedTo[from] = weight;
      }
      return this;
    },

    depthFirstMap:function(node, fn){
      fn(node);
      node.visited = true;
      for(connectedIndex in node.connectedTo){
        if(node.connectedTo[connectedIndex] != undefined && !this.nodes[connectedIndex].visited){
          this.depthFirstMap(this.nodes[connectedIndex], fn);
        }
      }
      return this;
    },

    isConnected:function(){
      var countingGraph = this.cloneGraph();
      countingGraph.counter = 0;
      return countingGraph.depthFirstMap(countingGraph.nodes[0], (function(node){
        if(!node.counted){
          this.counter++;
          node.counted = true;
        }
      }).bind(countingGraph)).block(function(){
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
        for(var j = (!directed ? 0 : i + 1); j < n; j++){
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
        newGraph.addNode(currentNode.value, []);
        for(connectedIndex in this.nodes[node].connectedTo){
          if(this.nodes[node].connectedTo[connectedIndex] == undefined){
            newGraph.addEdge(node, connectedIndex, this.nodes[node].connectedTo[connectedIndex]);
          }
        }
      }

      return newGraph;
     
    }
    
 };
   
};
